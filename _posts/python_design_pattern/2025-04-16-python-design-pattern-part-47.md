---

layout: docs
title: "Bài tập thực hành về strategy pattern"
author: chipmaster
date: 2025-04-16
part: 47
---


### Bài tập 1: Shipping Strategy

Refactor một module tính phí vận chuyển đang dùng if-else:

```python
# Trước khi refactor
class ShippingCalculator:
    def calculate(self, order, method: str):
        if method == "standard":
            return order.weight * 1.5
        elif method == "express":
            return order.weight * 3.0
        elif method == "overnight":
            return order.weight * 5.0 + 10
```

**Nhiệm vụ:**

Áp dụng Strategy Pattern để tách từng phương thức vận chuyển ra class riêng.

**Gợi ý cấu trúc:**

```python
class ShippingStrategy(ABC):
    @abstractmethod
    def calculate(self, order) -> float:
        pass

class StandardShipping(ShippingStrategy): ...
class ExpressShipping(ShippingStrategy): ...
class OvernightShipping(ShippingStrategy): ...

class ShippingContext:
    def set_strategy(self, strategy: ShippingStrategy): ...
    def calculate(self, order) -> float: ...
```

### Bài tập 2: Text Processing Strategy

Viết một text processor có thể áp dụng nhiều kiểu format:

- `UpperCaseStrategy` — chuyển tất cả thành chữ hoa
- `LowerCaseStrategy` — chuyển tất cả thành chữ thường
- `CapitalizeStrategy` — viết hoa chữ cái đầu mỗi từ

```python
processor = TextProcessor()
text = "hello world from python"

processor.set_strategy(UpperCaseStrategy())
print(processor.process(text))
# >> hello world from python

processor.set_strategy(CapitalizeStrategy())
print(processor.process(text))
# >> hello world from python
```

### Bài tập 3: Kiểm tra lại code Adapter

Mở lại code Adapter từ bài tập trước (XMLContactsAdapter, JSONReader, CSVContactsAdapter).

Tìm xem có chỗ nào có thể áp dụng Strategy Pattern không.

**Gợi ý để suy nghĩ:**

Nếu logic phân tích (parsing) trở nên phức tạp hơn — ví dụ có nhiều cách parse XML khác nhau — thì có thể tách parsing logic ra thành một Strategy riêng.

Đây là cách các pattern kết hợp với nhau trong dự án thực tế.
