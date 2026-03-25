---

layout: docs
title: "Bài tập thực hành về builder pattern"
author: chipmaster
date: 2025-04-08
part: 39
---

## User builder

### Key idea 1: Mô tả yêu cầu

Tạo class `User` với các thuộc tính sau:

| Thuộc tính | Loại | Bắt buộc? |
|-----------|------|-----------|
| `first_name` | `str` | Bắt buộc |
| `last_name` | `str` | Bắt buộc |
| `email` | `str` | Bắt buộc |
| `age` | `int` | Tùy chọn |
| `phone_number` | `str` | Tùy chọn |
| `address` | `str` | Tùy chọn |

**Yêu cầu quan trọng về immutability:**

- Sau khi `User` đã được tạo, không thể thay đổi dữ liệu.
- Chỉ cung cấp getters (không có setters).

### Key idea 2: Gợi ý cấu trúc

```python
class User:
    def __init__(self, first_name, last_name, email,
                 age=None, phone_number=None, address=None):
        self._first_name = first_name
        self._last_name = last_name
        self._email = email
        self._age = age
        self._phone_number = phone_number
        self._address = address

    # Chỉ có getters
    @property
    def first_name(self):
        return self._first_name

    @property
    def last_name(self):
        return self._last_name

    # ... thêm các getters khác

class UserBuilder:
    def __init__(self, first_name: str, last_name: str, email: str):
        self._first_name = first_name
        self._last_name = last_name
        self._email = email
        self._age = None
        self._phone_number = None
        self._address = None

    def set_age(self, age: int) -> 'UserBuilder':
        self._age = age
        return self  # Method chaining

    def set_phone_number(self, phone: str) -> 'UserBuilder':
        self._phone_number = phone
        return self

    def set_address(self, address: str) -> 'UserBuilder':
        self._address = address
        return self

    def build(self) -> User:
        return User(
            self._first_name,
            self._last_name,
            self._email,
            self._age,
            self._phone_number,
            self._address
        )
```

### Key idea 3: Cách sử dụng với method chaining

Với method chaining (mỗi setter trả về `self`), có thể viết:

```python
user = (UserBuilder("John", "Doe", "john@example.com")
        .set_age(25)
        .set_phone_number("123-456-7890")
        .set_address("123 Main St")
        .build())
```

Hoặc chỉ với các trường bắt buộc:

```python
minimal_user = UserBuilder("Jane", "Smith", "jane@example.com").build()
```

### Key idea 4: Câu hỏi thêm để suy nghĩ

- Tại sao nên dùng Builder thay vì truyền tất cả vào constructor?
- Immutability mang lại lợi ích gì trong một hệ thống multi-threaded?
- Nếu cần validate email format, validation nên đặt ở `User.__init__()` hay trong `UserBuilder.build()`?
