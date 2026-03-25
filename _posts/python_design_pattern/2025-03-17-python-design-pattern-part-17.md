---

layout: docs
title: "Solid principles trong lập trình hướng đối tượng"
author: chipmaster
date: 2025-03-17
part: 17
---


## Năm nguyên tắc solid

SOLID là tập hợp năm nguyên tắc quan trọng nhất trong OOP, mỗi chữ cái đại diện cho một nguyên tắc:

- **S** — Single Responsibility Principle (SRP)
- **O** — Open/Closed Principle (OCP)
- **L** — Liskov Substitution Principle (LSP)
- **I** — Interface Segregation Principle (ISP)
- **D** — Dependency Inversion Principle (DIP)

## Single responsibility principle (srp)

### Key idea 1: Một class chỉ có một lý do để thay đổi

Mỗi class chỉ nên có **một trách nhiệm duy nhất**. Không được trộn lẫn nhiều loại chức năng khác nhau vào một class.

Ví dụ về trách nhiệm đơn lẻ:
- Chỉ xử lý persistence (lưu trữ).
- Chỉ xử lý validation (kiểm tra dữ liệu).
- Chỉ xử lý notification (thông báo).
- Chỉ xử lý logging (ghi nhật ký).
- Chỉ xử lý formatting (định dạng).

## Open/closed principle (ocp)

### Key idea 2: Mở rộng được, không sửa đổi được

Phần mềm nên **mở cho extension** (có thể thêm tính năng mới) nhưng **đóng cho modification** (không được sửa code hiện tại).

Ví dụ: Có `Calculator` với bốn phép tính cơ bản. Khi cần thêm `ScientificCalculator`, không nên sửa `Calculator`. Thay vào đó, hãy **kế thừa** từ `Calculator`.

## Liskov substitution principle (lsp)

### Key idea 3: Object của class con có thể thay thế hoàn toàn class cha

Các function sử dụng reference của class cha phải có thể sử dụng object của class con **mà không biết sự khác biệt**.

Ví dụ: Nếu có `Shape` abstract class và `Triangle`, `Circle`, `Rectangle` là các class con — bất kỳ code nào gọi `shape.area()` đều hoạt động đúng dù `shape` là loại nào.

> Nếu thêm hình mới (`Oval`), code tính tổng diện tích không cần thay đổi — đây là LSP được thỏa mãn.

## Interface segregation principle (isp)

### Key idea 4: Client không nên bị ép phụ thuộc vào interface mình không dùng

Không nên tạo "fat interface" — interface quá lớn chứa nhiều method mà không phải client nào cũng cần.

Ví dụ: Thay vì một `IMultifunctionalDevice` với `print()`, `scan()`, `copy()`, `fax()`, hãy tạo **bốn interface riêng**:
- `IPrinter` với `print()`
- `IScanner` với `scan()`
- `ICopier` với `copy()`
- `IFax` với `fax()`

Khi đó `Printer` chỉ implement `IPrinter`, không bị ép implement `scan()` hay `fax()`.

## Dependency inversion principle (dip)

### Key idea 5: Phụ thuộc vào abstraction, không phụ thuộc vào concretion

High-level modules không nên phụ thuộc vào low-level modules. Cả hai đều nên phụ thuộc vào **abstraction**.

Ví dụ: `NotificationService` không nên tạo `EmailService` hay `SMSService` trực tiếp. Thay vào đó:

```python
class IMessageService(ABC):
    @abstractmethod
    def send(self, message, receiver):
        pass

class NotificationService:
    def __init__(self, service: IMessageService):
        self.service = service

    def send_notification(self, msg, receiver):
        self.service.send(msg, receiver)
```

Khi cần thêm `TelegramService`, chỉ cần tạo class mới implement `IMessageService`. `NotificationService` không cần thay đổi gì.

## Tóm tắt

| Nguyên tắc | Câu hỏi cần hỏi |
|-----------|-----------------|
| SRP | Class này có nhiều hơn một lý do để thay đổi không? |
| OCP | Tôi có thể thêm tính năng mà không sửa code hiện tại không? |
| LSP | Class con có thay thế hoàn toàn class cha được không? |
| ISP | Interface có chứa method mà client không dùng không? |
| DIP | Code có phụ thuộc vào implementation cụ thể không? |
