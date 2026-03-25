---

layout: docs
title: "Uml trong nghiên cứu Design Patterns"
author: chipmaster
date: 2025-03-04
part: 4
---


## Tại sao dùng uml?

UML (Unified Modeling Language) là công cụ tốt để tài liệu hóa các Design Patterns vì:

- Design Patterns có cấu trúc rõ ràng, được hiểu rõ ràng.
- UML truyền đạt cấu trúc đó rất hiệu quả thông qua biểu diễn trực quan.
- Tuy không dễ bảo trì khi requirements thay đổi, nhưng cho mục đích học tập, UML rất tuyệt vời.

Trong tài liệu này, chúng ta chỉ sử dụng hai loại diagram:

1. **Class Diagram** — biểu diễn cấu trúc
2. **Sequence Diagram** — biểu diễn hành vi

## Class diagram — biểu diễn cấu trúc

### Key idea 1: Class Diagram là gì?

Class Diagram dùng để **xây dựng và trực quan hóa các quan hệ hướng đối tượng**. Nó ghi lại:

- Thông tin của class: attributes và operations (methods).
- Các ký hiệu visibility: `+` là public, `-` là private.
- Quan hệ giữa các class.

**Ví dụ về generalization (inheritance):**

```
Shape (abstract)
├── Triangle
├── Circle
└── Rectangle
```

Cả ba class đều kế thừa từ `Shape` — đây là quan hệ **generalization**.

**Ví dụ về aggregation:**

Một Cylinder được tạo từ hai Circle và một Rectangle. Cylinder *aggregates* ba shapes. Đây là quan hệ **aggregation**.

### Key idea 2: Phân biệt black diamond và white diamond

Trong Class Diagram, có hai loại diamond:

- **Black diamond (filled)**: Composition — các phần tử không thể tồn tại độc lập nếu không có phần tử chứa nó. Nếu `House` bị xóa, `Bathroom` cũng bị xóa.
- **White diamond (hollow)**: Aggregation — các phần tử có thể tồn tại độc lập. `Pool` thuộc `House`, nhưng nếu `House` bị xóa, `Pool` vẫn tồn tại.

### Key idea 3: Dependency

`Shape` sử dụng `Calculator` nhưng `Calculator` không phải một phần của `Shape`. Đây là quan hệ **dependency** — lỏng lẻo hơn aggregation.

## Sequence diagram — biểu diễn hành vi

### Key idea 4: Sequence Diagram là gì?

Sequence Diagram dùng để **trực quan hóa hành vi hướng đối tượng**. Nó cho thấy:

- Các actor và object tham gia.
- Method calls và dữ liệu truyền theo thời gian.

**Ví dụ:** Cylinder tính diện tích bề mặt:

1. User gọi `getArea()` trên Cylinder.
2. Cylinder khởi tạo `area_sum = 0`.
3. Với mỗi Shape trong danh sách:
   - Gọi `getArea()` của Shape đó.
   - Cộng kết quả vào `area_sum`.
4. Trả về `area_sum` cho User.

> Sequence Diagram không chỉ cho bạn biết **cái gì** đang xảy ra, mà còn **như thế nào** nó được thực hiện.

## Tại sao uml phù hợp cho Design Patterns?

Design Patterns tạo thành những khối tương tác độc lập. Nhờ đó, chúng ta có thể nghiên cứu từng pattern riêng lẻ, nắm vững nó, rồi mới chuyển sang pattern tiếp theo. Đây chính là cách tiếp cận **divide and conquer** trong việc học kiến trúc phần mềm.
