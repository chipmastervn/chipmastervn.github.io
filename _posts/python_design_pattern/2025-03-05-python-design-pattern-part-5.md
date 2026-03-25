---

layout: docs
title: "Code có tổ chức và code hỗn loạn"
author: chipmaster
date: 2025-03-05
part: 5
---


## Hai cách tiếp cận thiết kế

### Key idea 1: Trực quan hóa sự khác biệt

Hãy tưởng tượng hai bức tranh:

**Bức tranh 1 (trái):** Một lưới hình chữ nhật đơn giản, được sắp xếp gọn gàng, có sự phân chia màu sắc rõ ràng. Mỗi ô vuông là một phần riêng biệt, có ranh giới rõ ràng.

**Bức tranh 2 (phải):** Một tập hợp các "blob" chồng lên nhau, có kích thước khác nhau, không có tổ chức rõ ràng. Các phần chồng chéo nhau bừa bãi.

Nếu áp dụng vào code:

- **Bức tranh trái** = Code được chia nhỏ tốt, áp dụng divide and conquer, được đóng gói (encapsulated) tốt.
- **Bức tranh phải** = Các khối code lớn nằm lộn xộn, nhiều sự phụ thuộc chồng chéo.

### Key idea 2: Tác động đến khả năng giao tiếp

Khi nhìn vào cách các thành phần giao tiếp với nhau:

- **Code có tổ chức (trái):** Dễ dàng thấy thành phần nào giao tiếp với thành phần nào. Các liên kết rõ ràng và có thể dự đoán được.
- **Code hỗn loạn (phải):** Khó xác định được luồng giao tiếp. Các phụ thuộc lẫn nhau chồng chéo, khó trace được logic.

### Key idea 3: Mục tiêu học tập

Mục tiêu khi học Design Patterns là đưa thiết kế của bạn về phía **trái** — nơi code được tổ chức theo những pattern rõ ràng, được định nghĩa tốt.

Thay vì tiếp cận hỗn loạn với các khối code lớn và phụ thuộc đan xen, chúng ta hướng đến:

- Cấu trúc rõ ràng.
- Phân chia trách nhiệm hợp lý.
- Giao tiếp giữa các thành phần dễ theo dõi.

Design Patterns chính là công cụ để đạt được điều đó.
