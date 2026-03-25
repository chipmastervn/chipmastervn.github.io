---

layout: docs
title: "Thực hành solid: liskov substitution principle"
author: chipmaster
date: 2025-03-21
part: 21
---


## Vấn đề — penguin vi phạm lsp

```python
class Bird:
    def fly(self):
        print("Flying!")

class Penguin(Bird):
    def fly(self):
        print("I can't fly!")  # Phá vỡ kỳ vọng
```

### Key idea 1: Phân tích vấn đề

LSP phát biểu: **Các object của class con phải có thể thay thế hoàn toàn cho object của class cha mà không làm thay đổi tính đúng đắn của chương trình.**

Vấn đề ở đây: Nếu code kỳ vọng một `Bird` có thể bay, thì truyền vào `Penguin` sẽ gây ra behavior không mong muốn — dù về mặt cú pháp không có lỗi.

```python
def make_bird_fly(bird: Bird):
    bird.fly()  # Kỳ vọng bird sẽ bay

make_bird_fly(Penguin())  # Nhưng Penguin không bay được!
```

Đây không phải lỗi syntax, nhưng là lỗi logic — vi phạm khế ước của class cha.

## Giải pháp — refactor phân cấp

### Key idea 2: Tạo phân cấp rõ ràng hơn

```python
class Bird:
    pass  # Class cơ sở cho mọi loài chim

class FlyingBird(Bird):
    def fly(self):
        print("Flying!")

class NonFlyingBird(Bird):
    def fly(self):
        print("I cannot fly, but I can run/swim!")

# Các class cụ thể
class Eagle(FlyingBird):
    pass

class Sparrow(FlyingBird):
    pass

class Penguin(NonFlyingBird):
    pass

class Ostrich(NonFlyingBird):
    pass
```

### Key idea 3: Code sau refactor tuân thủ LSP

Bây giờ có thể thay thế `Eagle` bằng `Sparrow` trong mọi ngữ cảnh sử dụng `FlyingBird` mà không gây vấn đề. Tương tự, `Penguin` và `Ostrich` đều là `NonFlyingBird` và tuân thủ đúng hành vi.

```python
def make_flying_bird_fly(bird: FlyingBird):
    bird.fly()  # An toàn — đảm bảo bird sẽ thực sự bay

make_flying_bird_fly(Eagle())    # Flying! ✓
make_flying_bird_fly(Sparrow())  # Flying! ✓
```

> Sự khác biệt tuy nhỏ, nhưng ảnh hưởng rất lớn. LSP đảm bảo rằng khi bạn thêm class con mới, hệ thống vẫn hoạt động đúng mà không cần kiểm tra lại toàn bộ code.
