---

layout: docs
title: "Bài tập thực hành về factory method pattern"
author: chipmaster
date: 2025-04-04
part: 35
---

### Bài tập 1 — Spaceship Factory (Simple Factory)

Tạo abstract class `Spaceship` với các thuộc tính:
- `position` — vị trí trên màn hình (x, y).
- `size` — kích thước (width, height).
- `display_name` — tên hiện thị.
- `speed` — tốc độ (x, y vector).

Tạo bốn concrete class:
- `MillenniumFalcon` (Star Wars)
- `UNSCInfinity` (Halo)
- `USSEnterprise` (Star Trek)
- `Serenity` (Firefly)

Sử dụng **Simple Factory Method**: một factory class tạo tất cả các loại spaceship dựa trên tham số đầu vào.

**Gợi ý cấu trúc:**

```python
from abc import ABC, abstractmethod
from enum import Enum, auto

class SpaceshipType(Enum):
    MILLENNIUM_FALCON = auto()
    UNSC_INFINITY = auto()
    USS_ENTERPRISE = auto()
    SERENITY = auto()

class Spaceship(ABC):
    def __init__(self, display_name, position, size, speed):
        self.display_name = display_name
        self.position = position
        self.size = size
        self.speed = speed

    @abstractmethod
    def display(self):
        pass

class SpaceshipFactory:
    @staticmethod
    def create_spaceship(ship_type: SpaceshipType) -> Spaceship:
        # Implement logic tạo spaceship tương ứng
        pass
```

### Bài tập 2 — Classic Factory Method

Implement **chính xác** cùng chức năng như Bài tập 1, nhưng lần này sử dụng **Classic Factory Method Pattern**:

- Tạo interface `ISpaceshipFactory` với method `create_spaceship()`.
- Tạo bốn factory class cụ thể: `MillenniumFalconFactory`, `UNSCInfinityFactory`, `USSEnterpriseFactory`, `SerenityFactory`.
- Mỗi factory class chỉ biết tạo một loại spaceship.
- Logic switching nằm ở một "director" level — không phải bên trong factory.

**So sánh:** Sau khi hoàn thành cả hai bài, hãy so sánh:

- Bài nào có nhiều class hơn?
- Bài nào dễ thêm loại spaceship mới hơn?
- Bài nào code client đơn giản hơn?

> Qua hai Bài tập, bạn sẽ thực sự cảm nhận được sự khác biệt giữa Simple Factory và Classic Factory — từ đó hiểu tại sao Simple Factory thường được ưa dùng hơn trong thực tế.
