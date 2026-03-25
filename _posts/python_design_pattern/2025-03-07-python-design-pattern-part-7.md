---

layout: docs
title: "Uml cơ bản: class diagram và sequence diagram"
author: chipmaster
date: 2025-03-07
part: 7
---


## Mục đích của uml trong thiết kế

UML được dùng để trực quan hóa hai khía cạnh của thiết kế:

1. **Structural relationships** — Các object liên kết với nhau như thế nào? Quan hệ giữa chúng là gì?
2. **Behavioral relationships** — Các object giao tiếp với nhau như thế nào? Ai gọi ai?

Mục tiêu cuối cùng: Hiểu **cái gì** đang được thực hiện và **như thế nào** nó được thực hiện.

## Class diagram — cấu trúc

### Key idea 1: Thông tin cơ bản trong Class Diagram

Class Diagram ghi lại các thông tin sau về mỗi class:

- **Attributes** (biến): dữ liệu mà class lưu trữ.
- **Operations** (methods): hành vi của class.
- **Visibility**: `+` là public, `-` là private.

**Ví dụ class `Shape`:**

```
+ color: String
+ location: Point
+ getArea(): Float
+ getColor(): String
+ getLocation(): Point
```

### Key idea 2: Quan hệ Generalization (Inheritance)

Khi `Triangle`, `Circle` và `Rectangle` đều kế thừa từ `Shape`, đây là quan hệ generalization. Trong diagram, mũi tên rỗng chỉ từ class con lên class cha.

### Key idea 3: Quan hệ Aggregation và Composition

- **Aggregation (white diamond):** "Có thể có". Ví dụ: `House` có `Pool`, nhưng xóa `House` thì `Pool` vẫn tồn tại.
- **Composition (black diamond):** "Bắt buộc có". Ví dụ: `House` có `Bathroom`. Xóa `House` thì `Bathroom` cũng biến mất.

### Key idea 4: Quan hệ Dependency

`Shape` *dùng* `Calculator` để tính toán, nhưng `Calculator` không phải thành phần của `Shape`. Đây là quan hệ dependency — liên kết lỏng lẻo.

**Ví dụ tổng hợp — `House`:**

```
House
├── Composition: Bathroom (x3), Door (x2), Window (x10), Garage
├── Aggregation: Pool
└── Dependency: ElectricalGrid
```

## Sequence diagram — hành vi

### Key idea 5: Sequence Diagram là gì?

Sequence Diagram trực quan hóa hành vi hướng đối tượng. Nó cho thấy:

- Sự trao đổi thông điệp theo thời gian.
- Method calls với dữ liệu truyền vào.

**Ví dụ — `Cylinder` tính diện tích:**

```
User → Cylinder: getArea()
Cylinder: area_sum = 0
Loop (for each shape in elements):
    Cylinder → Shape: getArea()
    Shape → Cylinder: trả về giá trị
    Cylinder: area_sum += giá trị
Cylinder → User: trả về area_sum
```

> Sequence Diagram không chỉ trả lời câu hỏi "cái gì đang xảy ra" mà còn "nó xảy ra như thế nào theo thứ tự thời gian".

## Kết hợp hai loại diagram

- **Class Diagram** → Hiểu cấu trúc tĩnh: các class, attributes, methods và quan hệ giữa chúng.
- **Sequence Diagram** → Hiểu luồng động: ai gọi ai, theo thứ tự nào.

Kết hợp cả hai cho phép bạn nắm toàn diện một Design Pattern từ cả cấu trúc lẫn hành vi.
