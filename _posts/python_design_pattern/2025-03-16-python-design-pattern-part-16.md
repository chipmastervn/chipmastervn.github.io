---

layout: docs
title: "Những nguyên tắc tạo nên kiến trúc tốt"
author: chipmaster
date: 2025-03-16
part: 16
---


## Các hallmarks của kiến trúc phần mềm tốt

Có bốn nguyên tắc chính tạo nên kiến trúc phần mềm chất lượng:

1. **Loose Coupling** — Kết nối lỏng lẻo
2. **Separation of Concerns** — Phân tách mối quan tâm
3. **Law of Demeter** — Luật Demeter
4. **SOLID Principles** — Các nguyên tắc SOLID

## Loose coupling — kết nối lỏng lẻo

### Key idea 1: Kết nối lỏng là gì?

Loose Coupling là **liên kết kiến thức yếu giữa các component**. Khi thay đổi một component, nó ảnh hưởng tối thiểu đến các component khác.

So sánh:

- **Tight coupling (kết nối chặt):** Thay đổi class B ảnh hưởng đến nhiều class khác — phải sửa nhiều nơi, test nhiều nơi, update tài liệu nhiều nơi.
- **Loose coupling (kết nối lỏng):** Thay đổi class B chỉ ảnh hưởng đến ít class — các thay đổi được cô lập.

> Kiến trúc lỏng lẻo làm cho hệ thống **dễ bảo trì hơn, dễ test hơn, dễ mở rộng hơn**.

## Separation of concerns — phân tách mối quan tâm

### Key idea 2: Chia kiến trúc thành các tầng

Separation of Concerns có nghĩa là cấu trúc kiến trúc xung quanh các tầng (tiers) chức năng chính:

- **Presentation Layer:** Web UI, Mobile UI — hiển thị dữ liệu cho người dùng.
- **Business Layer:** Logic nghiệp vụ — quyết định "người dùng muốn gì" và "làm thế nào".
- **Data Access Layer:** Đọc và ghi dữ liệu vào database hay nguồn lưu trữ.

Separation of Concerns được đạt được thông qua: **modularization, encapsulation và phân tầng phần mềm**.

## Law of demeter — nguyên tắc ít kiến thức nhất

### Key idea 3: "Chỉ nói chuyện với bạn bè gần nhất"

Law of Demeter (hay Principle of Least Knowledge) quy định:

- Mỗi unit chỉ nên có kiến thức giới hạn về các unit khác.
- Chỉ nên giao tiếp với các unit **gần gũi trực tiếp**.
- Không nên giao tiếp với "người lạ".

**Ví dụ:** Nếu `A` có thể giao tiếp với `B`, và `B` có thể giao tiếp với `C`:

- `A` giao tiếp với `B` → Chấp nhận được (`B` là bạn của `A`).
- `A` giao tiếp với `C` → Không nên (`C` là "người lạ" đối với `A`).

> Một đối tượng nên giả định càng ít càng tốt về cấu trúc hoặc thuộc tính của bất kỳ thứ gì khác ngoài "bạn bè gần nhất" của nó.

Nguyên tắc này dẫn thẳng đến **SOLID Principles** — chủ đề của phần tiếp theo.
