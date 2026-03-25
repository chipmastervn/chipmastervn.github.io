---

layout: docs
title: "Singleton pattern — metaclass và eager loading chi tiết"
author: chipmaster
date: 2025-03-26
part: 26
---


## Metaclass trong python

### Key idea 1: Metaclass là "class của class"

Mọi class trong Python đều kế thừa ngầm định từ `type` — một Metaclass tích hợp sẵn. Metaclass cho phép:

- Tùy chỉnh quá trình tạo class.
- Sửa đổi class attributes và methods trước khi class được tạo.
- Áp dụng behavior nhất quán cho nhiều class cùng lúc.

### Key idea 2: Singleton Metaclass hoàn chỉnh (lazy loading)

```python
class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            # Tạo instance lần đầu tiên
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Singleton(metaclass=SingletonMeta):
    def business_logic(self):
        print("Singleton logic here")
```

`_instances` là dictionary lưu instance duy nhất của mỗi class. Key là class (như `Singleton`), value là instance đã được tạo.

```python
s1 = Singleton()
s2 = Singleton()
print(s1 is s2)  # True — cùng một instance
```

### Key idea 3: Quan sát timing của Metaclass

Với lazy Singleton, nếu chỉ define class mà chưa tạo object thì không có gì xảy ra. `__call__` chỉ được gọi khi `Singleton()` được gọi.

## Eager loading với metaclass

### Key idea 4: Override `__init__` trong Metaclass để eager load

```python
class EagerSingletonMeta(type):
    _instances = {}

    def __init__(cls, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Tạo instance ngay khi class definition được load
        cls._instances[cls] = super().__call__()

    def __call__(cls, *args, **kwargs):
        return cls._instances[cls]

class EagerSingleton(metaclass=EagerSingletonMeta):
    def __init__(self):
        print("EagerSingleton initialized!")
```

Khi Python load file và đọc class definition, `EagerSingletonMeta.__init__` được gọi tự động — instance được tạo **ngay lập tức**, trước khi bất kỳ dòng code nào chạy.

> Khác biệt then chốt giữa `__init__` và `__new__` trong Metaclass: `__init__` của Metaclass chạy Metaclass definition load vào memory, còn `__new__` tạo class object.

### Key idea 5: Override `__new__` thay cho `__init__`

```python
class EagerSingletonMeta2(type):
    _instances = {}

    def __new__(mcs, *args, **kwargs):
        cls = super().__new__(mcs, *args, **kwargs)
        mcs._instances[cls] = super(EagerSingletonMeta2, cls).__call__()
        return cls

    def __call__(cls, *args, **kwargs):
        return cls._instances[cls]
```

Cả hai cách đều cho hiệu quả tương tự. Chỉ khác ở thứ tự: với `__new__`, super class được khởi tạo trước; với `__init__`, child được khởi tạo trước.

## Lợi ích của metaclass approach

### Key idea 6: Tại sao Metaclass là cách tốt nhất?

| Phương pháp | Ưu điểm | Nhược điểm |
|-------------|---------|-----------|
| Classic (GAng of Four) | Dễ hiểu | Cú pháp `get_instance()` không tự nhiên |
| Simple (`__new__`) | Cú pháp tự nhiên | Khó mở rộng |
| Metaclass | Tách biệt logic, tái sử dụng cao | Phức tạp hơn |

Metaclass cho phép `SingletonMeta` được tái sử dụng cho nhiều class khác nhau — chỉ cần thêm `metaclass=SingletonMeta` là bất kỳ class nào cũng trở thành Singleton.
