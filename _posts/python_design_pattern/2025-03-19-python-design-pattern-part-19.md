---

layout: docs
title: "Thực hành solid: open/closed principle"
author: chipmaster
date: 2025-03-19
part: 19
---


## Vấn đề — code vi phạm ocp

Xét class `AreaCalculator` sau:

```python
class AreaCalculator:
    def area(self, shape):
        if isinstance(shape, Circle):
            return 3.14159 * shape.radius ** 2
        elif isinstance(shape, Rectangle):
            return shape.width * shape.height

class Circle:
    def __init__(self, radius):
        self.radius = radius

class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
```

### Key idea 1: Xác định vấn đề

Vấn đề: Mỗi khi thêm hình mới (ví dụ `Triangle`), phải **sửa `AreaCalculator`** bằng cách thêm `elif isinstance(shape, Triangle)`.

Đây là vi phạm OCP: class không "đóng cho modification". Hệ quả:

- Code hiện tại hoạt động tốt, nhưng mỗi lần mở rộng đều tiềm ẩn nguy cơ phá vỡ code cũ.
- Số lượng `elif` sẽ ngày càng tăng theo số lượng hình học.

## Giải pháp — refactor theo ocp

### Key idea 2: Trừu tượng hóa thành abstract class

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

class AreaCalculator:
    def area(self, shape: Shape) -> float:
        return shape.area()  # Delegate hoàn toàn cho shape
```

### Key idea 3: Kết quả sau refactor

Giờ muốn thêm `Triangle`:

```python
class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def area(self):
        return 0.5 * self.base * self.height
```

`AreaCalculator` **không cần thay đổi gì**. Nó vẫn gọi `shape.area()` — và `Triangle` đã implement `area()` theo contract của `Shape`.

### Key idea 4: Nguyên tắc cốt lõi

Bằng cách trừu tượng hóa qua interface/abstract class:

- `AreaCalculator` **đóng cho modification** — không cần sửa khi thêm hình mới.
- Hệ thống **mở cho extension** — thêm hình mới chỉ cần tạo class mới.

> OCP đạt được khi bạn có thể thêm tính năng mới bằng cách **thêm code** thay vì **sửa code hiện tại**. Abstract classes và interfaces là công cụ chính để đạt được điều này.
