---

layout: docs
title: "Factory method pattern — code thực tế: shape game"
author: chipmaster
date: 2025-04-03
part: 34
---


## Ứng dụng: game vẽ hình ngẫu nhiên

Khi người dùng click vào màn hình, chương trình tạo ra một hình ngẫu nhiên (Circle hoặc Rectangle) tại vị trí đó với màu sắc và kích thước ngẫu nhiên.

## Phiên bản 1: cơ bản

### Key idea 1: Abstract Shape và các class cụ thể

```python
from abc import ABC, abstractmethod
import random

class Shape(ABC):
    def __init__(self, x, y):
        self.x = x
        self.y = y

    @abstractmethod
    def draw(self, screen):
        pass

class Circle(Shape):
    def __init__(self, x, y):
        super().__init__(x, y)
        self.color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
        self.radius = random.randint(10, 50)

    def draw(self, screen):
        import pygame
        pygame.draw.circle(screen, self.color, (self.x, self.y), self.radius)

class Rectangle(Shape):
    def __init__(self, x, y):
        super().__init__(x, y)
        self.color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
        self.width = random.randint(20, 80)
        self.height = random.randint(20, 80)

    def draw(self, screen):
        import pygame
        pygame.draw.rect(screen, self.color, (self.x, self.y, self.width, self.height))
```

### Key idea 2: Shape Factory

```python
class ShapeFactory:
    @staticmethod
    def create_shape(shape_type: str, x: int, y: int) -> Shape:
        if shape_type == "circle":
            return Circle(x, y)
        elif shape_type == "rectangle":
            return Rectangle(x, y)
        raise ValueError(f"Unknown shape: {shape_type}")
```

Lưu ý: Mỗi shape tự generate random data của mình (color, size) — đây là delegate trách nhiệm đúng cách.

## Phiên bản 2: cải tiến với context class

### Key idea 3: Dùng ShapeContext để truyền dữ liệu

```python
class ShapeContext:
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y

class ShapeFactory:
    @staticmethod
    def create_shape(shape_type: str, context: ShapeContext) -> Shape:
        if shape_type == "circle":
            return Circle(context.x, context.y)
        elif shape_type == "rectangle":
            return Rectangle(context.x, context.y)
        raise ValueError(f"Unknown shape: {shape_type}")
```

## Phiên bản 3: cải tiến với enum

### Key idea 4: Dùng Enum thay vì string thô

```python
from enum import Enum, auto

class ShapeType(Enum):
    CIRCLE = auto()
    RECTANGLE = auto()

class ShapeFactory:
    @staticmethod
    def create_shape(shape_type: ShapeType, context: ShapeContext) -> Shape:
        if shape_type == ShapeType.CIRCLE:
            return Circle(context.x, context.y)
        elif shape_type == ShapeType.RECTANGLE:
            return Rectangle(context.x, context.y)

# Generate random shape type — future-proof
random_type = random.choice(list(ShapeType))
shape = ShapeFactory.create_shape(random_type, context)
```

Lợi ích của Enum:
- Loại bỏ typos — `"cricle"` là lỗi khó phát hiện, `ShapeType.CIRCLE` thì không.
- `random.choice(list(ShapeType))` tự động bao gồm mọi loại hình mới — không cần cập nhật code.

## Game loop

### Key idea 5: Kết hợp tất cả trong game loop

```python
import pygame
import random

shapes = []
factory = ShapeFactory()

while running:
    for event in pygame.event.get():
        if event.type == pygame.MOUSEBUTTONDOWN:
            pos = event.pos
            shape_type = random.choice(list(ShapeType))
            context = ShapeContext(pos[0], pos[1])
            shape = factory.create_shape(shape_type, context)
            shapes.append(shape)

    screen.fill((255, 255, 255))
    for shape in shapes:
        shape.draw(screen)
    pygame.display.flip()
```

Factory method pattern làm cho game loop **không cần biết** loại shape nào được tạo ra. Thêm `Triangle` vào game? Chỉ cần thêm class `Triangle(Shape)` và một case trong factory — loop không cần thay đổi.
