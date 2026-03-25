---

layout: docs
title: "Ví dụ code: interface contract trong method"
author: chipmaster
date: 2025-03-14
part: 14
---


## Sử dụng interface như tham số

### Key idea 1: Method biết contract nhưng không biết implementation cụ thể

```python
from abc import ABC, abstractmethod

class MyInterface(ABC):
    @abstractmethod
    def my_method(self):
        pass

class MyClass(MyInterface):
    def my_method(self):
        print("Hello from MyClass")

class AnotherClass(MyInterface):
    def my_method(self):
        print("Hello from AnotherClass")

class NotImplementingInterface:
    def some_method(self):
        print("I have nothing to do with MyInterface")
```

Tạo method chấp nhận tham số kiểu `MyInterface`:

```python
def process_my_interface(obj: MyInterface):
    obj.my_method()  # An toàn vì contract đảm bảo my_method() tồn tại
```

### Key idea 2: Kết quả khi chạy

```python
my_obj = MyClass()
another_obj = AnotherClass()
wrong_obj = NotImplementingInterface()

process_my_interface(my_obj)      # Hello from MyClass ✓
process_my_interface(another_obj) # Hello from AnotherClass ✓
process_my_interface(wrong_obj)   # AttributeError: has no attribute 'my_method' ✗
```

`process_my_interface()` không biết gì về `MyClass` hay `AnotherClass`. Nó chỉ biết: "bất kỳ thứ gì được truyền vào phải có `my_method()`". Vì vậy `wrong_obj` gây lỗi — đây là hành vi mong muốn.

### Key idea 3: Tại sao điều này quan trọng với Design Patterns?

Trong Design Patterns, chúng ta cố tình thiết kế các contract để một đoạn code có thể làm việc với nhiều loại object khác nhau mà không cần biết cụ thể chúng là gì.

Ví dụ: một `Client` chỉ cần biết "đây là `Shape`", không cần biết là `Triangle` hay `Circle`. Điều này cho phép:

- Thêm `Hexagon` mới mà không sửa code của `Client`.
- Test từng component độc lập.
- Code ít bị phụ thuộc vào implementation cụ thể.

> Khái niệm này trực tiếp áp dụng vào hầu hết các Design Patterns trong tài liệu này — đặc biệt là Factory Method Pattern, Strategy Pattern, và Observer Pattern.
