---

layout: docs
title: "Ví dụ code oop: classes và kế thừa"
author: chipmaster
date: 2025-03-10
part: 10
---

## Ví dụ cơ bản: class `greeting`

### Key idea 1: Tạo và sử dụng class đơn giản

```python
class Greeting:
    def __init__(self, name):
        self.name = name  # Public variable

    def say_hello(self):
        print(f"Hello {self.name}")
```

Tạo nhiều instances từ cùng một class:

```python
greeting1 = Greeting("John")
greeting2 = Greeting("Jane")
greeting1.say_hello()  # Hello John
greeting2.say_hello()  # Hello Jane
```

Mỗi instance giữ dữ liệu riêng biệt — đây là bản chất của class như một "recipe".

### Key idea 2: Kế thừa và override

```python
class BetterGreeting(Greeting):
    def say_hello(self):
        print(f"Hello Better {self.name}")  # Override method
```

`BetterGreeting` kế thừa tất cả từ `Greeting` nhưng thay thế behavior của `say_hello()`.

Có thể gọi cả method của class cha bằng `super()`:

```python
class BetterGreeting(Greeting):
    def say_hello(self):
        super().say_hello()     # Từ Greeting: "Hello John"
        print("Better version") # Từ BetterGreeting
```

> Khi override một method và dùng `super()`, Python gọi implementation của class cha. Đây là cách tái sử dụng logic từ class cha trong khi vẫn mở rộng thêm.

## Ví dụ aggregation: `author` và `book`

### Key idea 3: Xây dựng object phức tạp từ object đơn giản

```python
class Author:
    def __init__(self, name, birth_year):
        self.name = name
        self.birth_year = birth_year

    def get_author_info(self):
        return f"{self.name}, born in {self.birth_year}"

class Book:
    def __init__(self, title, pub_year, author: Author):
        self.title = title
        self.pub_year = pub_year
        self.author = author

    def get_book_info(self):
        return f"{self.title} by {self.author.get_author_info()}, published {self.pub_year}"
```

Khi sử dụng:

```python
author = Author("George Orwell", 1903)
book = Book("1984", 1949, author)
print(book.get_book_info())
# 1984 by george orwell, born in 1903, published 1949
```

Điểm quan trọng:

- `Book` chứa một reference đến `Author` — đây là **aggregation**.
- `get_book_info()` không tự xử lý thông tin author, mà gọi `author.get_author_info()` — tôn trọng API của object bên trong.
- Đây là cách xây dựng **hệ thống phân cấp object phức tạp** từ những thành phần đơn giản.
