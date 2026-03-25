---

layout: docs
title: "Thực hành solid: liskov, interface segregation và dependency inversion"
author: chipmaster
date: 2025-03-20
part: 20
---


## Liskov substitution principle (lsp)

### Key idea 1: Vấn đề với Penguin

```python
class Bird:
    def fly(self):
        print("Flying...")

class Penguin(Bird):
    def fly(self):
        print("I can't fly!")  # Vi phạm kỳ vọng
```

Code vi phạm LSP: `Penguin` là `Bird`, nhưng khi code kỳ vọng một `Bird` có thể bay thì `Penguin` gây ra hành vi không mong muốn.

### Key idea 2: Giải pháp — Phân cấp đúng

```python
class Bird:
    pass

class FlyingBird(Bird):
    def fly(self):
        print("Flying...")

class NonFlyingBird(Bird):
    def fly(self):
        print("Cannot fly")

class Penguin(NonFlyingBird):
    pass

class Eagle(FlyingBird):
    pass
```

Giờ `Penguin` và `Eagle` có thể thay thế cho nhau trong các ngữ cảnh chỉ cần `Bird`, mà không phá vỡ kỳ vọng về hành vi.

## Interface segregation principle (isp)

### Key idea 3: Vấn đề với fat interface

```python
class IMultifunctionalDevice(ABC):
    @abstractmethod
    def print(self): pass
    @abstractmethod
    def scan(self): pass
    @abstractmethod
    def copy(self): pass
    @abstractmethod
    def fax(self): pass

class Printer(IMultifunctionalDevice):
    def print(self): print("Printing")
    def scan(self): pass    # Không cần nhưng bắt buộc phải implement
    def copy(self): pass    # Không cần nhưng bắt buộc phải implement
    def fax(self): pass     # Không cần nhưng bắt buộc phải implement
```

### Key idea 4: Giải pháp — Tách thành interface nhỏ

```python
class IPrinter(ABC):
    @abstractmethod
    def print(self): pass

class IScanner(ABC):
    @abstractmethod
    def scan(self): pass

class ICopier(ABC):
    @abstractmethod
    def copy(self): pass

class IFax(ABC):
    @abstractmethod
    def fax(self): pass

class Printer(IPrinter):
    def print(self): print("Printing")

class Scanner(IScanner):
    def scan(self): print("Scanning")

# Printer-copier implement đúng những gì cần
class PrinterCopier(IPrinter, ICopier):
    def print(self): print("Printing")
    def copy(self): print("Copying")
```

## Dependency inversion principle (dip)

### Key idea 5: Phụ thuộc vào abstraction, không phụ thuộc vào concretion

**Code vi phạm DIP:**

```python
class NotificationService:
    def __init__(self):
        self.email_service = EmailService()   # Tight coupling
        self.sms_service = SMSService()       # Tight coupling

    def send_notification(self, method, msg, receiver):
        if method == "email":
            self.email_service.send_email(msg, receiver)
        elif method == "sms":
            self.sms_service.send_sms(msg, receiver)
```

**Giải pháp — Phụ thuộc vào interface:**

```python
class IMessageService(ABC):
    @abstractmethod
    def send(self, message, receiver):
        pass

class EmailService(IMessageService):
    def send(self, message, receiver):
        print(f"Sending email to {receiver}: {message}")

class SMSService(IMessageService):
    def send(self, message, receiver):
        print(f"Sending SMS to {receiver}: {message}")

class NotificationService:
    def __init__(self, service: IMessageService):
        self.service = service  # Chỉ biết interface, không biết implementation

    def send_notification(self, msg, receiver):
        self.service.send(msg, receiver)
```

Bây giờ có thể dễ dàng thêm `TelegramService` hay `WhatsAppService` mà không cần sửa `NotificationService`.

> DIP là nguyên lý nền tảng dẫn đến các Design Patterns như Abstract Factory, Builder và Dependency Injection — những pattern mà chúng ta sẽ thấy trong phần tiếp theo.
