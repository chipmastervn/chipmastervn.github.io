---

layout: docs
title: "Singleton pattern — giới thiệu"
author: chipmaster
date: 2025-03-24
part: 24
---


## Singleton là gì?

Singleton là một **Creational Design Pattern** đảm bảo rằng một class chỉ có **duy nhất một instance**, đồng thời cung cấp cách truy cập toàn cục (global access) đến instance đó.

## Các nguyên tắc cốt lõi

### Key idea 1: Bốn tenet của Singleton

1. **Chỉ có một instance duy nhất** — mọi nỗ lực tạo instance thứ hai đều trả về instance đã tồn tại.
2. **Truy cập toàn cục** — bất kỳ đâu trong code cũng có thể lấy instance đó.
3. **Kiểm soát khởi tạo** — việc tạo instance được kiểm soát chặt chẽ bên trong class.
4. **Serialized access** — nếu có thread safety issues, việc truy cập phải được xử lý tuần tự.

### Key idea 2: Singleton dùng để làm gì?

Singleton phù hợp cho những resource cần **một điểm truy cập duy nhất**:

- **Logger** — tất cả log đều ghi vào cùng một file.
- **Caching** — mọi module đều dùng chung một cache.
- **Thread pool** — quản lý một tập hợp thread chung.
- **Database connections** — quản lý pool kết nối database.
- **Configuration** — cấu hình ứng dụng được load một lần và chia sẻ.

### Key idea 3: Ví dụ trực quan

Ba client cùng gọi đến Singleton Logger:

```
Client A → Singleton Logger → log file
Client B → Singleton Logger → log file
Client C → Singleton Logger → log file
```

Dù mỗi client gọi từ nơi khác nhau, tất cả đều ghi vào cùng một file log. Singleton đảm bảo điều đó.

## Nguồn gốc và ứng dụng

Singleton là một trong những pattern nổi tiếng nhất của **Gang of Four**. Động lực của pattern:

> "It is important for some classes to have exactly one instance. Although there can be many printers in a system, there should only be one printer spooler. There should be only one file system and one window manager."

Singleton thường được dùng kết hợp với: Abstract Factory, Builder, Prototype, và State pattern.

## Khi nào dùng và khi nào không dùng

### Key idea 4: Khi nào nên dùng Singleton?

Dùng khi cần **kiểm soát truy cập vào một shared resource**.

### Key idea 5: Khi nào không nên dùng?

Dùng có chừng mực. Không để Singleton biến thành "global access cho mọi thứ". Truy cập toàn cục ẩn các phụ thuộc và làm code khó đọc.

Câu hỏi then chốt cần hỏi trước khi dùng Singleton:

> "Singleton này có vi phạm Single Responsibility Principle không?"

Nếu Singleton đang làm quá nhiều việc khác nhau (cả logging lẫn caching), thì nên tách ra.

## Các cân nhắc thiết kế

### Key idea 6: Lazy vs Eager instantiation

- **Lazy instantiation**: Chỉ tạo instance khi lần đầu tiên được yêu cầu. Tiết kiệm memory nếu bạn không chắc instance có được dùng hay không.
- **Eager instantiation**: Tạo instance ngay khi class được load. Phù hợp khi cần instance sẵn sàng ngay lập tức (ví dụ: sound effects trong game cần được loaded trước khi người chơi bắt đầu).

### Key idea 7: Thread safety

Python hỗ trợ lập trình đa luồng. Khi nhiều thread cùng truy cập Singleton, cần đảm bảo **chỉ một instance được tạo ra** dù có race conditions. Vấn đề thread safety của Singleton sẽ được giải quyết chi tiết ở phần coding.
