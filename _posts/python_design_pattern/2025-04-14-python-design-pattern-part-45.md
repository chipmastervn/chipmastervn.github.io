---

layout: docs
title: "Strategy pattern — kiến trúc"
author: chipmaster
date: 2025-04-14
part: 45
---

## Các thành phần của strategy pattern

### Key idea 1: Sơ đồ cấu trúc

```
Context
  |-- strategy: Strategy (interface)
                    ^
          __________|__________
         |          |          |
   ConcreteA   ConcreteB   ConcreteC
```

**Context:**

- Giữ một reference đến `Strategy` interface
- Không biết concrete strategy nào đang được dùng
- Cung cấp `set_strategy()` để thay đổi strategy

**Strategy (interface):**

- Khai báo method chung mà tất cả strategies phải implement

**ConcreteStrategy:**

- Implement algorithm cụ thể theo interface đã định

### Key idea 2: Cách hoạt động

**Bước 1:** Client tạo một ConcreteStrategy cụ thể.

**Bước 2:** Client set strategy đó vào Context.

**Bước 3:** Client gọi `execute()` trên Context.

**Bước 4:** Context delegate việc thực thi sang strategy hiện tại.

```python
context = Context()

strategy_a = ConcreteStrategyA()
context.set_strategy(strategy_a)
context.execute()   # Dùng algorithm A

strategy_b = ConcreteStrategyB()
context.set_strategy(strategy_b)
context.execute()   # Dùng algorithm B
```

### Key idea 3: So sánh với Template Method

| Tiêu chí | Strategy | Template Method |
|---------|----------|-----------------|
| Thay đổi behavior | Tại runtime | Tại compile time |
| Cơ chế | Composition | Inheritance |
| Linh hoạt | Cao hơn | Thấp hơn |
| Phức tạp | Tạo nhiều class | Ít class hơn |

Strategy dùng **composition**: Context chứa Strategy.

Template Method dùng **inheritance**: Subclass override method.

### Key idea 4: Nguyên tắc thiết kế liên quan

Strategy Pattern thể hiện ba nguyên tắc quan trọng:

**Open/Closed Principle:** Thêm strategy mới không cần sửa Context.

**Single Responsibility:** Mỗi ConcreteStrategy chỉ chứa một algorithm.

**Dependency Inversion:** Context phụ thuộc vào abstraction (interface), không phụ thuộc vào implementation cụ thể.
