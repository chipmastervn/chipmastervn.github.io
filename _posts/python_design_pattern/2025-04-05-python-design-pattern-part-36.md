---

layout: docs
title: "Builder pattern — giới thiệu"
author: chipmaster
date: 2025-04-05
part: 36
---

## Vấn đề với object phức tạp

Tưởng tượng bạn cần build một `House` object với các thuộc tính:
- walls, windows, floors, doors
- garage, pool, backyard, garden, basement

Cách tiếp cận thông thường — constructor dài dòng:

```python
house = House(walls=10, windows=8, floors=2, garage=True,
              pool=False, doors=5, backyard=False,
              garden=False, basement=False)
```

### Key idea 1: Tại sao constructor phức tạp là vấn đề?

- **Khó đọc**: Không ai nhớ được thứ tự 10 tham số.
- **Kém linh hoạt**: Phải truyền tất cả tham số dù không cần.
- **Khó bảo trì**: Thêm một thuộc tính mới → sửa constructor và mọi nơi gọi constructor.
- **Vấn đề cốt lõi**: Object tự chịu trách nhiệm tạo chính nó (constructor với quá nhiều logic).

## Builder pattern là gì?

Builder là một **Creational Design Pattern** tách biệt quá trình xây dựng object phức tạp khỏi representation của nó.

### Key idea 2: Bốn ý tưởng cốt lõi

1. **Tách construction khỏi representation**: Object House không tự tạo mình nữa — Builder làm điều đó.
2. **Cùng construction, khác representation**: Cùng một quá trình build có thể tạo ra các kiểu nhà khác nhau.
3. **Step-by-step**: Builder thực hiện xây dựng theo từng bước có thể kiểm soát.
4. **Không phải lúc nào cũng cần tất cả bước**: Builder có thể skip các bước không cần thiết.

### Key idea 3: Ví dụ document converter

Cùng một RTF document có thể được convert thành nhiều định dạng:

```
RTF Document
    → Reader → Tokens
    → Parser → Elements
    → Director
        → GoogleDocBuilder → Google Doc
        → WordBuilder → Word Document
        → HTMLBuilder → HTML Document
        → PDFBuilder → PDF Document
```

Mọi builder đều thực hiện cùng các bước (create_title, create_page, create_author...) nhưng tạo ra output khác nhau.

## Khi nào dùng builder?

### Key idea 4: Các trường hợp phù hợp

- Khi class có nhiều constructor với nhiều tham số khác nhau.
- Khi cần build các object phức tạp dạng tree hierarchy.
- Khi muốn tạo nhiều "representation" của một object phức tạp theo cùng một quy trình.

Ví dụ: Pizza với topping khác nhau, Car với cấu hình khác nhau, Report với format khác nhau.

### Key idea 5: Pros và Cons

**Pros:**
- Tách biệt rõ ràng construction và representation.
- Kiểm soát chi tiết từng bước construction.
- Hỗ trợ thay đổi internal representation của object.

**Cons:**
- Phải tạo thêm class: mỗi loại object cần một Builder riêng.
- Builder classes phải mutable trong quá trình xây dựng.
