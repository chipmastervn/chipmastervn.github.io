---

layout: docs
title: "Tại sao cần kiến trúc phần mềm?"
author: chipmaster
date: 2025-03-03
part: 3
---


## Vấn đề của các hệ thống phức tạp

Các hệ thống phần mềm phức tạp thường đi kèm với nhiều vấn đề nghiêm trọng:

- Timeline bị kéo dài khi yêu cầu thay đổi liên tục.
- Nhiều lập trình viên khó phối hợp công việc hiệu quả.
- Code bị trùng lặp và tài liệu thiếu sót.
- Bảo trì khó khăn, thêm tính năng mới dễ phá vỡ hệ thống.

Tất cả những điều này dẫn đến **hệ thống được thiết kế kém** — khó bảo trì và không thể mở rộng.

## Câu trả lời: kiến trúc và thiết kế tốt

### Key idea 1: Kiến trúc như bản thiết kế tòa nhà

Hãy hình dung việc xây dựng Empire State Building. Luôn có một bản thiết kế cấp cao. Bản thiết kế đó được chia sẻ với tất cả các bên liên quan — từ kiến trúc sư, chuỗi cung ứng, công nhân xây dựng đến lịch máy móc — để mọi người đều biết mình đang làm gì.

Trong phần mềm, chúng ta cũng cần sự **có thể dự đoán và gắn kết** như vậy.

### Key idea 2: Vòng đời phát triển phần mềm

Một vòng phát triển chuẩn gồm ba giai đoạn:

**Bước 1: Thu thập yêu cầu**
Thu thập và tài liệu hóa tất cả requirements cho UX và mục tiêu tổng thể của dự án.

**Bước 2: Thiết kế (Design)**
Kiến trúc hóa hệ thống dựa trên các yêu cầu đã thu thập.

**Bước 3: Triển khai (Implementation)**
Code và kiểm tra giải pháp để đảm bảo nó tuân theo thiết kế và đáp ứng yêu cầu.

> Không nhất thiết phải làm tuần tự. Bạn có thể làm theo vòng lặp: thu thập một số yêu cầu, thiết kế, code làm proof of concept, rồi lặp lại. Dù theo cách nào, bạn vẫn cần một **thiết kế tốt**.

### Key idea 3: Các tài liệu trong một dự án thực tế

Một dự án phần mềm điển hình bao gồm nhiều tài liệu và artifacts:

- Requirements documents
- Design documents
- UI/UX documents
- Test suites và documentation
- Deployment documents
- Audit logs và analytics
- Architecture documents
- Database diagrams

Tất cả đều xoay quanh **source code** — sản phẩm cuối cùng của toàn bộ quá trình.

## Design patterns và kiến trúc tốt

Design Patterns giúp tài liệu hóa và dạy về kiến trúc phần mềm. Để biểu diễn các pattern, chúng ta sẽ sử dụng **UML** — công cụ trực quan hóa chuẩn trong ngành phần mềm.
