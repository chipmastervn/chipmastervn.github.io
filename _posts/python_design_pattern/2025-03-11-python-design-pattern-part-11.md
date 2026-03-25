---

layout: docs
title: "Ví dụ code: abstract classes và kỹ thuật nâng cao"
author: chipmaster
date: 2025-03-11
part: 11
---


## Abstract class với implementation một phần

### Key idea 1: Abstract class như "half-done implementation"

```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def sound(self):
        pass

    def description(self):
        print(f"{self.__class__.__name__} says {self.sound()}")
```

Lưu ý: `description()` đã được implement, còn `sound()` là abstract và bắt buộc phải override.

```python
class Dog(Animal):
    def sound(self):
        return "Woof"

    def description(self):
        super().description()  # Delegate lên Animal

class Cat(Animal):
    def sound(self):
        return "Meow"

    def description(self):
        super().description()
```

### Key idea 2: Trick với `super().method()`

Khi override một abstract method nhưng muốn dùng lại implementation của class cha, chỉ cần gọi `super().description()`. Method đó trong `Animal` vẫn có thể truy cập `self.sound()` của class con vì Python resolve method dựa trên instance thực tế đang được gọi.

Ví dụ:

```python
dog = Dog()
dog.description()  # Dog says Woof
cat = Cat()
cat.description()  # Cat says Meow
```

### Key idea 3: Làm thế nào `description()` của Animal biết gọi đúng `sound()`?

Khi `dog.description()` gọi `super().description()`, method đó chạy trong class `Animal`, nhưng `self` vẫn là instance của `Dog`. Vì vậy `self.sound()` sẽ gọi `Dog.sound()` — trả về "Woof".

Đây là sức mạnh của **polymorphism**: method của class cha có thể sử dụng behavior của class con.

### Key idea 4: Override không bắt buộc nếu method không abstract

Nếu bỏ decorator `@abstractmethod` khỏi `description()`:

```python
class Animal(ABC):
    @abstractmethod
    def sound(self):
        pass

    def description(self):  # Không còn abstract
        print(f"{self.__class__.__name__} says {self.sound()}")
```

Lúc này các class con không cần override `description()`, nhưng vẫn có thể làm nếu muốn thay đổi behavior.

> Sự khác biệt: **abstract method** = bắt buộc phải implement; **non-abstract method** = tùy chọn.
