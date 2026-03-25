---

layout: docs
title: "Thực hành solid: interface segregation principle"
author: chipmaster
date: 2025-03-22
part: 22
---

## Vấn đề — fat interface

```python
from abc import ABC, abstractmethod

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
    def print(self):
        print("Printing...")

    def scan(self):
        pass  # Printer không cần scan — bắt buộc implement là sai

    def copy(self):
        pass  # Printer không cần copy — bắt buộc implement là sai

    def fax(self):
        pass  # Printer không cần fax — bắt buộc implement là sai
```

### Key idea 1: Xác định vấn đề

ISP phát biểu: **Clients không nên bị ép phụ thuộc vào các interface mà họ không sử dụng.**

Vấn đề: `Printer` phải implement `scan()`, `copy()`, `fax()` dù không cần. Điều này tạo ra "fat interface" — interface béo phì, mang những method thừa.

Hậu quả:
- Class `Printer` mang theo những method vô nghĩa.
- Khó maintain khi interface thay đổi.
- Code không thể hiện đúng ý định thiết kế.

## Giải pháp — tách interface thành nhỏ

### Key idea 2: Bốn interface riêng biệt

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
```

### Key idea 3: Class chỉ implement những gì cần

```python
class Printer(IPrinter):
    def print(self):
        print("Printing...")

class Scanner(IScanner):
    def scan(self):
        print("Scanning...")

class Copier(ICopier):
    def copy(self):
        print("Copying...")

class Fax(IFax):
    def fax(self):
        print("Faxing...")

# Python hỗ trợ multiple inheritance
class PrinterCopier(IPrinter, ICopier):
    def print(self):
        print("Printing...")

    def copy(self):
        print("Copying...")
```

### Key idea 4: Lợi ích

Sau khi refactor:
- `Printer` chỉ implement `print()` — không mang "gánh nặng" của các method không liên quan.
- Dễ tạo thiết bị đa chức năng bằng cách implement nhiều interface.
- Code rõ ràng, thể hiện đúng khả năng của từng thiết bị.

> ISP thường đi cùng với SRP. Khi một interface có quá nhiều methods không liên quan, đó là dấu hiệu cần tách ra — tương tự như class có nhiều trách nhiệm cần tách thành nhiều class.
