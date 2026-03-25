---

layout: docs
title: "Singleton pattern — thread safety"
author: chipmaster
date: 2025-03-27
part: 27
---


## Vấn đề thread safety trong singleton

Tất cả các phiên bản Singleton đã xem xét đều **không an toàn với đa luồng (not thread-safe)**. Khi nhiều thread cùng cố gắng tạo Singleton cùng lúc, có thể xảy ra **race condition** dẫn đến nhiều instance được tạo ra.

## Race condition là gì?

### Key idea 1: Critical section và race condition

**Critical section** là vùng code mà khi nhiều thread cùng thực thi đồng thời có thể gây ra kết quả không nhất quán. Thường là vùng code **ghi dữ liệu**.

Với Singleton, critical section là đoạn kiểm tra và tạo instance:

```python
if cls._instance is None:        # Thread A và B cùng thấy None
    cls._instance = cls.__new__() # Cả hai cùng tạo instance!
```

Kết quả: hai instance được tạo ra — singleton bị phá vỡ.

## Lock mechanism

### Key idea 2: Sử dụng Lock để bảo vệ critical section

```
Thread A ──► Lock ──► Critical Section
Thread B ──► Lock ──► Waiting Queue
Thread C ──► Lock ──► Waiting Queue
```

Chỉ một thread tại một thời điểm được vào critical section. Các thread khác phải chờ trong queue cho đến khi thread hiện tại giải phóng lock.

### Key idea 3: Ví dụ thread-safe đơn giản

```python
import threading

class Counter:
    def __init__(self):
        self.count = 0
        self.lock = threading.Lock()

    def increment(self):
        with self.lock:  # Acquire lock
            self.count += 1  # Critical section
        # Lock tự động được giải phóng khi ra khỏi `with`
```

`with self.lock` là cú pháp Python để acquire và tự động release lock.

## Thread-safe singleton (simple version)

### Key idea 4: Override `__new__` với lock

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
```

`_lock` là class-level variable — chỉ có một lock cho tất cả các thread. Khi thread nào đó acquire lock và kiểm tra `_instance`, các thread khác phải chờ.

## Thread-safe singleton (metaclass version)

### Key idea 5: Thread safety trong Metaclass

```python
import threading

class ThreadSafeSingletonMeta(type):
    _instances = {}
    _lock = threading.Lock()

    def __call__(cls, *args, **kwargs):
        with cls._lock:
            if cls not in cls._instances:
                cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Singleton(metaclass=ThreadSafeSingletonMeta):
    pass
```

### Key idea 6: Test thread safety với multiple threads

```python
def get_singleton_instance():
    s = Singleton()
    print(id(s))  # In ra memory address

threads = [threading.Thread(target=get_singleton_instance) for _ in range(10)]
for t in threads:
    t.start()
for t in threads:
    t.join()
```

Nếu tất cả 10 dòng in ra cùng một memory address, Singleton đang hoạt động thread-safe đúng cách. Kết quả là một sequence hoàn hảo các địa chỉ giống nhau chứng minh chỉ có một instance tồn tại dù 10 thread cùng chạy.
