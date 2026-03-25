---

layout: docs
title: "Ví dụ về Singleton pattern"
author: chipmaster
date: 2025-03-28
part: 28
---


## Phiên bản 1: classic gang of four

### Key idea 1: Kiểm soát instantiation qua `get_instance()`

```python
class ClassicSingleton:
    _instance = None

    def __init__(self):
        raise RuntimeError("Call get_instance() instead")

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            instance = cls.__new__(cls)
            cls._instance = instance
            print("Singleton created (get_instance called)")
        return cls._instance
```

Test:
```python
s1 = ClassicSingleton.get_instance()
s2 = ClassicSingleton.get_instance()
print(s1 is s2)  # True
print(id(s1) == id(s2))  # True — cùng memory address
```

## Phiên bản 2: simple python singleton

### Key idea 2: Kiểm soát qua `__new__`

```python
class SimpleSingleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            print("Creating new instance via __new__")
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        print("__init__ called (always executes)")
```

Lưu ý: `__new__` tạo instance, `__init__` khởi tạo nó. Với Singleton, `__init__` có thể bị gọi nhiều lần (mỗi lần `SimpleSingleton()` được gọi), nhưng `__new__` chỉ tạo instance một lần.

## Phiên bản 3: metaclass singleton

### Key idea 3: Logic Singleton tách biệt trong Metaclass

```python
class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        print("SingletonMeta.__call__ invoked")
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Singleton(metaclass=SingletonMeta):
    def business_logic(self):
        print("Business logic here")
```

Test:
```python
s1 = Singleton()
s2 = Singleton()
print(s1 is s2)  # True
```

### Key idea 4: Quan sát hành vi khi không tạo object

Nếu chỉ define class mà không có code tạo instance:

```python
class Singleton(metaclass=SingletonMeta):
    pass
# Không có gì in ra — singletonmeta.__call__ chưa được gọi
```

Đây xác nhận đây là **lazy instantiation**.

## Thread-safe singleton trong thực tế

### Key idea 5: Test với 10 threads

```python
import threading

class ThreadSafeSingleton:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super().__new__(cls)
        return cls._instance

def get_singleton():
    s = ThreadSafeSingleton()
    print(id(s))

threads = [threading.Thread(target=get_singleton) for _ in range(10)]
for t in threads:
    t.start()
for t in threads:
    t.join()
```

Kết quả: 10 dòng in ra cùng một memory address — chứng minh Singleton hoạt động đúng dù có 10 thread chạy đồng thời.
