---

layout: docs
title: "Thực hành solid: dependency inversion principle"
author: chipmaster
date: 2025-03-23
part: 23
---


## Vấn đề — phụ thuộc trực tiếp vào concrete class

```python
class EmailService:
    def send_email(self, message, receiver):
        print(f"Sending email to {receiver}: {message}")

class SMSService:
    def send_sms(self, message, receiver):
        print(f"Sending SMS to {receiver}: {message}")

class NotificationService:
    def __init__(self):
        self.email_service = EmailService()  # Tight coupling
        self.sms_service = SMSService()      # Tight coupling

    def send_notification(self, method, message, receiver):
        if method == "email":
            self.email_service.send_email(message, receiver)
        elif method == "sms":
            self.sms_service.send_sms(message, receiver)
```

### Key idea 1: Xác định vấn đề

DIP phát biểu: **High-level modules không nên phụ thuộc vào low-level modules. Cả hai đều nên phụ thuộc vào abstraction.**

`NotificationService` phụ thuộc trực tiếp vào `EmailService` và `SMSService`. Vấn đề:

- Muốn thêm `TelegramService`? Phải sửa `NotificationService`.
- Muốn test `NotificationService` độc lập? Không thể mà không tạo `EmailService` và `SMSService`.
- Tight coupling làm cho code khó mở rộng và khó test.

## Giải pháp — phụ thuộc vào interface

### Key idea 2: Tạo abstraction

```python
from abc import ABC, abstractmethod

class IMessageService(ABC):
    @abstractmethod
    def send(self, message, receiver):
        pass
```

### Key idea 3: Implement cụ thể tuân theo contract

```python
class EmailService(IMessageService):
    def send(self, message, receiver):
        print(f"Sending email to {receiver}: {message}")

class SMSService(IMessageService):
    def send(self, message, receiver):
        print(f"Sending SMS to {receiver}: {message}")
```

### Key idea 4: NotificationService chỉ biết interface

```python
class NotificationService:
    def __init__(self, service: IMessageService):
        self.service = service  # Chỉ phụ thuộc vào abstraction

    def send_notification(self, message, receiver):
        self.service.send(message, receiver)
```

### Key idea 5: Kết quả

Giờ có thể dễ dàng thêm service mới:

```python
class TelegramService(IMessageService):
    def send(self, message, receiver):
        print(f"Sending Telegram to {receiver}: {message}")

# Sử dụng
email_notification = NotificationService(EmailService())
sms_notification = NotificationService(SMSService())
telegram_notification = NotificationService(TelegramService())
```

`NotificationService` không cần thay đổi gì khi thêm `TelegramService`. Đây chính là DIP trong thực tế.

> DIP là cơ sở của Design Patterns sắp học — đặc biệt Singleton, Factory Method, và Builder đều áp dụng nguyên tắc này. Tiếp theo chúng ta sẽ bước vào phần thú vị nhất: các Design Patterns thực tế.
