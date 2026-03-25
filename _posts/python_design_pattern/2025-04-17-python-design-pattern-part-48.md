---

layout: docs
title: "Observer pattern — giới thiệu"
author: chipmaster
date: 2025-04-17
part: 48
---

## Observer pattern là gì?

### Key idea 1: Cơ chế Publisher-Subscriber

Observer Pattern mô tả mối quan hệ **một-nhiều** giữa các object:

- Khi một object thay đổi trạng thái, tất cả các object phụ thuộc vào nó sẽ được thông báo và cập nhật tự động.

Hai vai trò chính:

| Vai trò | Mô tả |
|--------|-------|
| **Subject (Publisher)** | Object bị quan sát. Duy trì danh sách observers. Gửi thông báo khi thay đổi. |
| **Observer (Subscriber)** | Object quan sát. Nhận thông báo và phản ứng tương ứng. |

### Key idea 2: Ví dụ thực tế

**YouTube channel:**

- Khi kênh đăng video mới → tất cả subscribers nhận thông báo
- Subscriber có thể hủy đăng ký bất kỳ lúc nào
- Kênh không biết subscriber đang làm gì với thông báo

Đây chính xác là Observer Pattern.

### Key idea 3: Khi nào nên dùng Observer?

Observer Pattern phù hợp trong các tình huống:

- **GUI frameworks:** button click → cập nhật nhiều component khác nhau
- **MVC architecture:** Model thay đổi → View tự cập nhật
- **Event-driven systems:** HTTP request, user input
- **Distributed systems:** Thay đổi ở một node → đồng bộ sang các node khác

**Dấu hiệu cần dùng Observer:**

Khi một class A phải "poll" (hỏi thường xuyên) class B để biết có thay đổi không — Observer giúp đảo chiều: B chủ động thông báo cho A.

### Key idea 4: Lợi ích cốt lõi

- **Loose coupling:** Subject không cần biết Observer là gì, chỉ biết interface
- **Mở rộng dễ dàng:** Thêm Observer mới không cần sửa Subject
- **Thông báo đồng loạt:** Một thay đổi kích hoạt nhiều phản ứng

Observer Pattern là nền tảng của nhiều framework hiện đại: React (state), Angular (reactive forms), RxJS, EventEmitter trong Node.js.
