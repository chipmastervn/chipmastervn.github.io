---

layout: docs
title: "Builder pattern — code thực tế: sandwich builder"
author: chipmaster
date: 2025-04-07
part: 38
---

## Bài toán: xây dựng sandwich

Hai loại sandwich với quy trình tương tự nhưng ingredients khác nhau:

- **Veggie Sandwich**: Wheat bread + Lettuce + Tomato + Cucumber
- **Ham Sandwich**: White bread + Ham + Cheese + Mayonnaise

## Triển khai

### Key idea 1: Core class — `Sandwich`

```python
class Sandwich:
    def __init__(self):
        self.ingredients = []

    def add_ingredient(self, ingredient: str):
        self.ingredients.append(ingredient)

    def display(self) -> str:
        return "Sandwich: " + ", ".join(self.ingredients)
```

### Key idea 2: Abstract Builder

```python
from abc import ABC, abstractmethod

class SandwichBuilder(ABC):
    def __init__(self):
        self._sandwich = None

    def create_new_sandwich(self):
        self._sandwich = Sandwich()

    def get_result(self) -> Sandwich:
        return self._sandwich

    @abstractmethod
    def add_bread(self):
        pass

    @abstractmethod
    def add_filling(self):
        pass
```

### Key idea 3: Concrete Builders

```python
class VeggieSandwichBuilder(SandwichBuilder):
    def add_bread(self):
        self._sandwich.add_ingredient("Wheat bread")

    def add_filling(self):
        self._sandwich.add_ingredient("Lettuce")
        self._sandwich.add_ingredient("Tomato")
        self._sandwich.add_ingredient("Cucumber")

class HamSandwichBuilder(SandwichBuilder):
    def add_bread(self):
        self._sandwich.add_ingredient("White bread")

    def add_filling(self):
        self._sandwich.add_ingredient("Ham")
        self._sandwich.add_ingredient("Cheese")
        self._sandwich.add_ingredient("Mayonnaise")
```

### Key idea 4: Director

```python
class SandwichDirector:
    def __init__(self, builder: SandwichBuilder):
        self._builder = builder

    def change_builder(self, builder: SandwichBuilder):
        self._builder = builder

    def build_sandwich(self) -> Sandwich:
        self._builder.create_new_sandwich()
        self._builder.add_bread()
        self._builder.add_filling()
        return self._builder.get_result()
```

## Sử dụng

### Key idea 5: Client code cực kỳ đơn giản

```python
# Bước 1: chọn builder
veggie_builder = VeggieSandwichBuilder()
director = SandwichDirector(veggie_builder)

# Bước 2: director tự làm mọi thứ
veggie_sandwich = director.build_sandwich()
print(veggie_sandwich.display())
# Sandwich: wheat bread, lettuce, tomato, cucumber

# Chuyển sang ham sandwich
director.change_builder(HamSandwichBuilder())
ham_sandwich = director.build_sandwich()
print(ham_sandwich.display())
# Sandwich: white bread, ham, cheese, mayonnaise
```

### Key idea 6: Sequence diagram

```
Client          Director             VeggieSandwichBuilder
  │                │                         │
  │─ tạo Builder ─────────────────────────►│
  │─ tạo Director ─►│                       │
  │                  │                       │
  │─ build_sandwich()►│                     │
  │                  │─ create_new_sandwich()►│ (tạo Sandwich trống)
  │                  │─ add_bread() ─────────►│ (thêm Wheat bread)
  │                  │─ add_filling() ────────►│ (thêm Lettuce, Tomato, Cucumber)
  │                  │─ get_result() ──────────►│
  │◄──────────── Sandwich ───────────────────-│
```

Client chỉ cần: **chọn builder** + **gọi director**. Toàn bộ quá trình phức tạp được ẩn bên trong.
