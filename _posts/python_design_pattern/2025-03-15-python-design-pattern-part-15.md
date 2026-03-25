---

layout: docs
title: "Ví dụ code: abstract class kết hợp contract và implementation"
author: chipmaster
date: 2025-03-15
part: 15
---


## Abstract class `shape` — ví dụ hoàn chỉnh

### Key idea 1: Cấu trúc của abstract class kết hợp

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
        print(f"{self.__class__.__name__} has color {self.color}")
```

Trong class này:
- `color` là attribute chung → tất cả shapes đều có màu sắc.
- `area()` và `perimeter()` là abstract → mỗi shape có cách tính riêng.
- `description()` đã có implementation → các class con không cần viết lại.

### Key idea 2: Triển khai cụ thể

```python
class Rectangle(Shape):
    def __init__(self, width, height, color):
        super().__init__(color)  # Delegate color cho Shape
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

Lưu ý: `super().__init__(color)` trong cả hai class để đảm bảo `Shape.__init__()` được gọi và `self.color` được khởi tạo đúng.

### Key idea 3: Code không phụ thuộc vào class cụ thể

```python
def process_shape_color(shape: Shape):
    shape.description()  # Hoạt động với mọi Shape
```

`process_shape_color()` không biết `shape` là `Rectangle` hay `Circle`. Nó chỉ cần `shape` là một `Shape` — đảm bảo `description()` tồn tại.

```python
rect = Rectangle(4, 5, "red")
circle = Circle(3, "blue")

process_shape_color(rect)    # Rectangle has color red
process_shape_color(circle)  # Circle has color blue
```

### Key idea 4: Code mở rộng mà không cần sửa đổi

Nếu sau này thêm class `Triangle(Shape)`:

```python
class Triangle(Shape):
    def __init__(self, base, height, color):
        super().__init__(color)
        self.base = base
        self.height = height

    def area(self):
        return 0.5 * self.base * self.height

    def perimeter(self):
        # ...
        pass
```

`process_shape_color()` **không cần thay đổi** để hỗ trợ `Triangle`. Đây là sức mạnh của contract — code trở nên **future-proof**.

> Đây là cách Abstract class trong Python kết hợp những điểm tốt nhất của interface (contract) và class thông thường (reusable implementation) — một nền tảng quan trọng cho tất cả Design Patterns sắp học.
