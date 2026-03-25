---

layout: docs
title: "Factory method pattern — kiến trúc và hai biến thể"
author: chipmaster
date: 2025-04-02
part: 33
---

## Hai biến thể của factory method pattern

### Key idea 1: Classic Gang of Four Factory Method

Trong biến thể gốc, mỗi class cụ thể có **factory riêng của nó**:

```
Instance (interface)
├── ConcreteInstanceA
└── ConcreteInstanceB

IFactory (interface)
├── ConcreteFactoryA → tạo ConcreteInstanceA
└── ConcreteFactoryB → tạo ConcreteInstanceB
```

Cách dùng:
```python
# Để lấy concreteinstancea:
factory_a = ConcreteFactoryA()
instance_a = factory_a.create_instance()  # Trả về ConcreteInstanceA qua interface

# Để lấy concreteinstanceb:
factory_b = ConcreteFactoryB()
instance_b = factory_b.create_instance()  # Trả về ConcreteInstanceB qua interface
```

Nhược điểm: Mỗi loại instance cần một factory class riêng — tăng số lượng class.

### Key idea 2: Simple Factory Method (Parameterized) — Được Khuyến Nghị

Một factory duy nhất xử lý tất cả loại instance thông qua tham số:

```
Instance (interface)
├── ConcreteInstanceA
└── ConcreteInstanceB

InstanceFactory (static methods only)
└── create_instance(name) → trả về Instance theo tên
```

Cách dùng:
```python
instance_a = InstanceFactory.create_instance("instance_a")
instance_b = InstanceFactory.create_instance("instance_b")
```

Ưu điểm:
- Chỉ cần **một factory class** cho tất cả các loại.
- Dễ mở rộng bằng cách thêm case mới trong factory.
- Code client đơn giản hơn nhiều.

## Thiết kế factory method pattern

### Key idea 3: Các bước thiết kế

**Bước 1:** Xác định nhóm object cần factory. Ví dụ: `Shape`, `Bullet`, `Vehicle`.

**Bước 2:** Tạo interface/abstract class cho nhóm đó. Tất cả class con phải tuân theo contract này.

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def draw(self):
        pass
```

**Bước 3:** Tạo factory với static method nhận parameter xác định loại instance.

```python
class ShapeFactory:
    @staticmethod
    def create_shape(shape_type: str, **kwargs) -> Shape:
        if shape_type == "circle":
            return Circle(**kwargs)
        elif shape_type == "rectangle":
            return Rectangle(**kwargs)
        raise ValueError(f"Unknown shape: {shape_type}")
```

**Bước 4:** Sử dụng Enum thay vì string thô để tránh lỗi typo.

```python
from enum import Enum, auto

class ShapeType(Enum):
    CIRCLE = auto()
    RECTANGLE = auto()

class ShapeFactory:
    @staticmethod
    def create_shape(shape_type: ShapeType, **kwargs) -> Shape:
        if shape_type == ShapeType.CIRCLE:
            return Circle(**kwargs)
        elif shape_type == ShapeType.RECTANGLE:
            return Rectangle(**kwargs)
```

### Key idea 4: Context class để truyền dữ liệu

Thay vì truyền nhiều tham số rời rạc, dùng một **context class** bao gồm tất cả:

```python
class ShapeContext:
    def __init__(self, x, y, color, size=None):
        self.x = x
        self.y = y
        self.color = color
        self.size = size

class ShapeFactory:
    @staticmethod
    def create_shape(shape_type: ShapeType, context: ShapeContext) -> Shape:
        if shape_type == ShapeType.CIRCLE:
            return Circle(context)
        elif shape_type == ShapeType.RECTANGLE:
            return Rectangle(context)
```

Lợi ích: Nếu sau này cần thêm tham số mới, chỉ cần thêm vào `ShapeContext` — method signature không cần thay đổi.
