---

layout: docs
title: "Singleton pattern — các cách triển khai trong python"
author: chipmaster
date: 2025-03-25
part: 25
---


## Các giới hạn và đặc điểm của python

Trước khi code, cần hiểu Python không hoàn toàn giống các ngôn ngữ OOP khác:

- Python không có "constructor" thực sự, nhưng có `__new__` (tạo object) và `__init__` (khởi tạo object).
- Python không có `static` keyword, nhưng có **class-level variables và methods**.
- Có nhiều cách implement Singleton trong Python: subclass, decorator, hoặc **Metaclass**.

Trong ba cách, **Metaclass** là phù hợp nhất vì nó kiểm soát được chính quá trình tạo class.

## Ba phương thức override quan trọng

### Key idea 1: `__new__`, `__init__`, và `__call__`

- **`__new__`**: Static method, chịu trách nhiệm **tạo** và trả về instance mới. Được override khi cần kiểm soát quá trình tạo object.
- **`__init__`**: Instance method, chịu trách nhiệm **khởi tạo** attributes sau khi object đã được tạo.
- **`__call__`**: Instance method, cho phép gọi instance như gọi function. Với Metaclass, `__call__` được invoke khi tạo instance của class con.

## Phiên bản 1: classic gang of four

### Key idea 2: Kiểm soát constructor bằng `__init__`

```python
class ClassicSingleton:
    _instance = None

    def __init__(self):
        raise RuntimeError("Use get_instance() instead")

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls.__new__(cls)
        return cls._instance
```

Cách dùng:
```python
s1 = ClassicSingleton.get_instance()
s2 = ClassicSingleton.get_instance()
print(s1 is s2)  # True
```

Đây là **lazy instantiation** — instance chỉ được tạo khi `get_instance()` được gọi lần đầu.

## Phiên bản 2: python đơn giản (override `__new__`)

### Key idea 3: Kiểm soát tạo object qua `__new__`

```python
class SimpleSingleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
```

Cách dùng:
```python
s1 = SimpleSingleton()
s2 = SimpleSingleton()
print(s1 is s2)  # True
```

Thứ tự gọi khi tạo object: `__new__` được gọi trước, sau đó `__init__` được gọi để khởi tạo. Cả hai lần gọi constructor đều tạo ra cùng một instance.

## Phiên bản 3: metaclass (được khuyến nghị)

### Key idea 4: Singleton logic trong Metaclass

```python
class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Singleton(metaclass=SingletonMeta):
    def __init__(self):
        # Logic khởi tạo của bạn ở đây
        pass
```

Ưu điểm của Metaclass:
- Tách biệt hoàn toàn logic Singleton (trong Metaclass) với logic nghiệp vụ (trong class thực).
- Có thể tái sử dụng `SingletonMeta` cho nhiều class khác nhau.
- Cú pháp sử dụng tự nhiên hơn: `s = Singleton()`.

## Phiên bản 4: eager loading với metaclass

### Key idea 5: Tạo instance ngay khi class được load

```python
class EagerSingletonMeta(type):
    _instances = {}

    def __init__(cls, *args, **kwargs):
        super().__init__(*args, **kwargs)
        cls._instances[cls] = super().__call__()  # Tạo ngay khi load

    def __call__(cls, *args, **kwargs):
        return cls._instances[cls]  # Chỉ trả về instance đã tồn tại

class EagerSingleton(metaclass=EagerSingletonMeta):
    pass
```

Khi Python load class `EagerSingleton`, `__init__` của Metaclass được gọi ngay — instance được tạo **trước khi bất kỳ code nào chạy**.

## `get_instance()` vs constructor

### Key idea 6: Khi nào nên dùng `get_instance()`?

Dùng `get_instance()` mang lại lợi ích:
- **Nhất quán** — tên method đồng nhất dù đổi tên class.
- **Linh hoạt** — dễ mở rộng initialization logic.
- **Gợi ý thiết kế** — khi thấy `get_instance()`, developer ngay lập tức biết đây là Singleton.
