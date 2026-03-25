---

layout: docs
title: "Ví dụ code: interface contract trong thực tế"
author: chipmaster
date: 2025-03-13
part: 13
---


## Interface contract cơ bản

### Key idea 1: Không thể instantiate abstract class

```python
from abc import ABC, abstractmethod

class MyInterface(ABC):
    @abstractmethod
    def my_method(self):
        pass
```

Cố gắng tạo instance trực tiếp từ `MyInterface` sẽ gây lỗi:

```python
obj = MyInterface()  # TypeError: Can't instantiate abstract class
```

Đây là đúng theo thiết kế. Abstract class chỉ dùng để tạo contract, không dùng để tạo object trực tiếp.

### Key idea 2: Contract và class kế thừa

Hai class implement cùng interface:

```python
class MyClass(MyInterface):
    def my_method(self):
        print("MyClass implementation")

class AnotherClass(MyInterface):
    def my_method(self):
        print("AnotherClass implementation")
```

Khi gọi `my_method()` trên từng object, mỗi class có implementation riêng:

```python
obj1 = MyClass()
obj2 = AnotherClass()
obj1.my_method()  # MyClass implementation
obj2.my_method()  # AnotherClass implementation
```

### Key idea 3: Sức mạnh thực sự — code không cần biết class cụ thể

Đây là điểm cốt lõi của interface contract:

```python
def process_any_object(obj: MyInterface):
    obj.my_method()  # Luôn hoạt động vì MyInterface đảm bảo my_method() tồn tại
```

`process_any_object()` không cần biết `obj` là `MyClass` hay `AnotherClass`. Nó chỉ biết: "bất kỳ thứ gì là `MyInterface` đều có `my_method()`".

### Key idea 4: Lợi ích trong thiết kế lớn

Tưởng tượng interface `Shape` với method `area()`:

```python
class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass
```

Giờ muốn tính tổng diện tích mọi loại hình học:

```python
def total_area(shapes: list) -> float:
    return sum(shape.area() for shape in shapes)
```

`total_area()` không cần biết đó là `Triangle`, `Circle` hay `Rectangle`. Thêm hình mới trong tương lai? `total_area()` không cần thay đổi gì cả.

> Interface contract tạo ra code **future-proof** — không cần sửa khi thêm class mới, miễn là class mới tuân thủ contract.
