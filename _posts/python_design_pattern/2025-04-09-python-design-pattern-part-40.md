---

layout: docs
title: "Adapter pattern — giới thiệu"
author: chipmaster
date: 2025-04-09
part: 40
---


## Adapter pattern là gì?

### Key idea 1: Vấn đề trong thực tế

Trong quá trình phát triển phần mềm, thường gặp hai loại vấn đề tương thích:

**Vấn đề 1: Data incompatibility**

Hệ thống A gửi dữ liệu dạng XML. Nhưng thư viện bên ngoài chỉ nhận dữ liệu dạng JSON.

Hai bên không thể giao tiếp trực tiếp.

**Vấn đề 2: Interface incompatibility**

Một thư viện cũ có `Rectangle(x, y, width, height)`.

Phần còn lại của hệ thống đang dùng `Rectangle(top_left, bottom_right)`.

Hai interface không khớp nhau.

### Key idea 2: Giải pháp — Adapter

Adapter là một class trung gian nằm giữa hai class không tương thích.

Nó:

- Nhận dữ liệu theo dạng mà client đang dùng
- Chuyển đổi sang dạng mà service cần
- Trả kết quả về cho client

```
Client --> Adapter --> Service
```

Client không biết Service tồn tại. Client không biết Adapter đang chuyển đổi gì. Client chỉ gọi interface quen thuộc.

### Key idea 3: Ví dụ thực tế dễ hiểu

Hãy nghĩ đến một ổ cắm điện ở Việt Nam (2 lỗ tròn) và một thiết bị của Mỹ (2 lỗ dẹt).

Bạn không sửa thiết bị. Bạn không sửa ổ cắm. Bạn dùng một **bộ chuyển đổi (adapter)**.

Trong lập trình cũng vậy — Adapter Pattern cho phép tích hợp các thành phần không tương thích mà không cần sửa đổi chúng.

### Key idea 4: Khi nào nên dùng Adapter?

Dùng Adapter khi:

- Cần tích hợp với code/thư viện bên ngoài mà không thể sửa đổi
- Có class cũ (legacy code) không phù hợp với interface mới nhưng vẫn cần dùng
- Muốn tái sử dụng class hiện có dù interface của nó không khớp

Không nên dùng Adapter khi có thể sửa trực tiếp source code — đó là giải pháp đơn giản hơn.
