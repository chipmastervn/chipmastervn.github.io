---

layout: docs
title: "Factory method pattern — giới thiệu"
author: chipmaster
date: 2025-04-01
part: 32
---


## Vấn đề với constructor trực tiếp

Trong lập trình OOP thông thường, chúng ta tạo object bằng constructor:

```python
rectangle = Rectangle()
circle = Circle()
fast_bullet = FastBullet()
slow_bullet = SlowBullet()
```

### Key idea 1: Tại sao constructor trực tiếp là vấn đề?

Code biết **chính xác loại class** nào được tạo ra — đây là sự **tight coupling** với kiểu cụ thể. Hệ quả:

- Khi thêm bullet mới (SplashBullet), phải tìm tất cả các chỗ tạo bullet và cập nhật.
- Code ngày càng phụ thuộc vào chi tiết implementation.
- Vi phạm OCP — phải sửa code hiện tại khi thêm tính năng.

## Factory method là gì?

Factory Method là một **Creational Design Pattern** cho phép **trừu tượng hóa quá trình tạo object**, che giấu logic khởi tạo khỏi client.

### Key idea 2: Hai điểm cốt lõi

1. **Object được tạo bằng factory method, không phải constructor.**
2. **Object được tạo thông qua abstraction, không phải concretion.**

```python
# Thay vì:
bullet = FastBullet()

# Dùng:
bullet = BulletFactory.create_bullet("fast")
```

Client không cần biết `FastBullet` tồn tại. Nó chỉ cần nói "cho tôi một fast bullet".

## Ví dụ: space shooter game

### Key idea 3: Abstraction bullets qua interface

```python
from abc import ABC, abstractmethod

class Bullet(ABC):
    @abstractmethod
    def fire(self):
        pass

class FastBullet(Bullet):
    def fire(self):
        print("Fast bullet fired!")

class SlowBullet(Bullet):
    def fire(self):
        print("Slow bullet fired!")

class SplashBullet(Bullet):
    def fire(self):
        print("Splash bullet fired!")
```

`BulletFactory` luôn trả về kiểu `Bullet` — client chỉ làm việc với contract:

```python
class BulletFactory:
    @staticmethod
    def create_bullet(bullet_type: str) -> Bullet:
        if bullet_type == "fast":
            return FastBullet()
        elif bullet_type == "slow":
            return SlowBullet()
        elif bullet_type == "splash":
            return SplashBullet()
        raise ValueError(f"Unknown bullet type: {bullet_type}")
```

### Key idea 4: Lợi ích bổ sung — Caching trong factory

```python
class CachedBulletFactory:
    _cache = {}

    @staticmethod
    def create_bullet(bullet_type: str) -> Bullet:
        if bullet_type not in CachedBulletFactory._cache:
            # Tạo mới và cache
            bullet = BulletFactory.create_bullet(bullet_type)
            CachedBulletFactory._cache[bullet_type] = bullet
        return CachedBulletFactory._cache[bullet_type]
```

Client không biết về cache — nó chỉ gọi factory và nhận bullet. Đây là sức mạnh của abstraction.

## Nguồn gốc và ứng dụng

Factory Method là một trong những pattern nổi tiếng nhất của Gang of Four:

> "Define an interface for creating an object, but let subclasses decide which class to instantiate."

### Key idea 5: Khi nào dùng Factory Method?

- Khi client không thể dự đoán trước loại object cần tạo.
- Khi cần thêm loại object mới mà không sửa code client.
- Khi có nhiều object thuộc cùng một nhóm (shapes, bullets, vehicles).

### Key idea 6: Pros và Cons

**Pros:**
- Tuân thủ Single Responsibility Principle.
- Tuân thủ Open/Closed Principle.
- Tạo ra kiến trúc rất sạch và linh hoạt.

**Cons:**
- Tăng số lượng class trong hệ thống. (Nhưng Parameterized Factory Method giảm thiểu nhược điểm này.)
