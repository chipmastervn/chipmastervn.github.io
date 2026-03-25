---

layout: docs
title: "Interface contracts và abstract classes trong python"
author: chipmaster
date: 2025-03-09
part: 9
---


## Khái niệm contract

Một **contract** là lời hứa rằng một class sẽ cung cấp một số hành vi nhất định. Ví dụ: nếu tôi biết `Cat` là `Animal`, thì tôi có thể chắc chắn rằng `Cat` có thể `speak()` vì tất cả `Animal` đều có thể `speak()`.

## Interface contract trong python

### Key idea 1: Python sử dụng Abstract Class để mô phỏng Interface

Python không có cú pháp `interface` như Java hay C#. Thay vào đó, ta dùng **abstract class với các method không có implementation**.

```python
from abc import ABC, abstractmethod

class MyInterface(ABC):
    @abstractmethod
    def my_method(self):
        pass
```

Bất kỳ class nào kế thừa từ `MyInterface` đều **bắt buộc** phải implement `my_method()`.

```python
class MyClass(MyInterface):
    def my_method(self):
        print("MyClass implementation")

class AnotherClass(MyInterface):
    def my_method(self):
        print("AnotherClass implementation")
```

### Key idea 2: Type hinting để enforce contract

Sử dụng type hinting để đảm bảo chỉ những object tuân thủ contract mới được chấp nhận:

```python
def process_my_interface(obj: MyInterface):
    obj.my_method()  # Đảm bảo my_method() luôn tồn tại
```

Nếu truyền vào một object không implement `MyInterface`, Python sẽ báo lỗi runtime.

### Key idea 3: Tại sao interface quan trọng?

Interface cho phép viết code **không phụ thuộc vào class cụ thể**. Ví dụ: nếu có interface `Shape` với method `area()`, có thể tính tổng diện tích mọi loại hình học mà không cần biết đó là `Triangle`, `Circle` hay `Rectangle`.

> Code chỉ cần biết: "đây là `Shape`" → "nó có `area()`" → gọi `area()`.

## Abstract classes — nằm giữa interface và class

### Key idea 4: Abstract class có thể có implementation một phần

Abstract class khác interface ở chỗ nó có thể có **cả method đã implement lẫn abstract method**.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    def __init__(self, color):
        self.color = color

    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

    def description(self):
        print(f"This shape has color: {self.color}")
```

- `area()` và `perimeter()` là abstract → các class con bắt buộc implement.
- `description()` đã có implementation → các class con kế thừa và dùng luôn.

### Key idea 5: Ví dụ triển khai

```python
class Rectangle(Shape):
    def __init__(self, width, height, color):
        super().__init__(color)
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

class Circle(Shape):
    def __init__(self, radius, color):
        super().__init__(color)
        self.radius = radius

    def area(self):
        import math
        return math.pi * self.radius ** 2

    def perimeter(self):
        import math
        return 2 * math.pi * self.radius
```

`Rectangle` và `Circle` đều không cần implement lại `description()` vì đã kế thừa từ `Shape`.

### Key idea 6: Lợi ích của Abstract class

Ý tưởng cốt lõi là **tái sử dụng (reuse)**. Thay vì mỗi `Rectangle` hay `Circle` tự định nghĩa lại `description()`, ta định nghĩa một lần trong `Shape` và mọi class con đều dùng được. Ít code hơn, dễ bảo trì hơn.
