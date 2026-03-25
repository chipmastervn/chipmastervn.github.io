---

layout: docs
title: "Ôn tập python hướng đối tượng"
author: chipmaster
date: 2025-03-08
part: 8
---


## Tổng quan

Phần này ôn tập các khái niệm OOP (Object-Oriented Programming) trong Python 3.5+, bao gồm:

- Classes và Objects
- Encapsulation
- Inheritance
- Interface contracts và Abstract classes

## Classes và objects

### Key idea 1: Class là "recipe" để tạo Object

Class cung cấp hai thứ:

- **Data container**: biến lưu trữ dữ liệu.
- **Operations on data**: các phương thức thao tác trên dữ liệu.

```python
class Greeting:
    def __init__(self, name):
        self.name = name

    def say_hello(self):
        print(f"Hello {self.name}")
```

Từ class này, ta tạo object (instance):

```python
greeting = Greeting("John")
greeting.say_hello()  # In ra: Hello John
```

### Key idea 2: UML của một Class

Trong UML, class `Greeting` được biểu diễn như sau:

```
Greeting
- name: String
+ Greeting(name: String)
+ say_hello(): void
```

> Ký hiệu `-` nghĩa là private, `+` nghĩa là public. Trong Python không có private thực sự, nhưng UML thể hiện **ý định thiết kế**.

## Encapsulation — đóng gói

### Key idea 3: Bản chất của Encapsulation

Encapsulation là việc **gom dữ liệu và hành vi liên quan vào một chỗ**. Nó giúp kiểm soát độ phức tạp bằng cách đặt nhiều code phức tạp đằng sau một interface dễ sử dụng.

Nguyên tắc:

- Tạo class cho mỗi đối tượng cần quản lý.
- Nhóm các đối tượng liên quan lại để có thể xử lý như một đơn vị duy nhất.

**Ví dụ — `Author` và `Book`:**

```python
class Author:
    def __init__(self, name, birth_year):
        self.name = name
        self.birth_year = birth_year

    def get_author_info(self):
        return f"{self.name} (born {self.birth_year})"

class Book:
    def __init__(self, title, pub_year, author: Author):
        self.title = title
        self.pub_year = pub_year
        self.author = author

    def get_book_info(self):
        return f"{self.title} by {self.author.get_author_info()}, published {self.pub_year}"
```

`Book` aggregates `Author` — đây là cách xây dựng các object phức tạp từ các object đơn giản hơn.

## Inheritance — kế thừa

### Key idea 4: Kế thừa cho phép generalization

Inheritance cho phép tạo ra các phiên bản mới, chuyên biệt hơn của class cha, kế thừa cả dữ liệu lẫn hành vi.

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} makes a sound")

class Dog(Animal):
    def speak(self):
        print(f"{self.name} barks")

class Cat(Animal):
    def speak(self):
        print(f"{self.name} meows")
```

```python
dog = Dog("Buddy")
cat = Cat("Whiskers")
dog.speak()  # Buddy barks
cat.speak()  # Whiskers meows
```

### Key idea 5: Kế thừa tạo ra kỳ vọng hành vi

Điều quan trọng hơn việc kế thừa code là kế thừa **kỳ vọng hành vi**. Vì `Dog` và `Cat` đều là `Animal`, bất kỳ code nào biết `Animal` có method `speak()` đều có thể gọi `speak()` trên `Dog` hoặc `Cat` mà không cần biết cụ thể chúng là gì.

Đây là nền tảng cho khái niệm **interface contract**, sẽ được đề cập ở phần tiếp theo.
