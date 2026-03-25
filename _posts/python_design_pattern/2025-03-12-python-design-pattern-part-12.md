---

layout: docs
title: "Ví dụ code: encapsulation với bankaccount"
author: chipmaster
date: 2025-03-12
part: 12
---


## Encapsulation thực tế

### Key idea 1: Kiểm soát truy cập dữ liệu

Class `BankAccount` minh họa encapsulation bằng cách kiểm soát cách dữ liệu được đọc và ghi:

```python
class BankAccount:
    def __init__(self, account_number, balance):
        self._account_number = account_number  # Protected
        self.__balance = balance               # Private

    def get_balance(self):
        return self.__balance

    def set_balance(self, balance):
        if balance >= 0:
            self.__balance = balance
        else:
            print("Invalid balance: must be >= 0")

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
        else:
            print("Invalid deposit amount")

    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
        else:
            print("Invalid withdrawal amount")
```

### Key idea 2: Protected và Private trong Python

| Ký hiệu | Loại | Ý nghĩa |
|---------|------|---------|
| `_name` | Protected | Không nên truy cập trực tiếp từ bên ngoài (convention) |
| `__name` | Private | Python name mangling — không thể truy cập trực tiếp |

Với `__balance`, bạn không thể truy cập `account.__balance` từ bên ngoài class. Bạn chỉ có thể dùng `get_balance()` và `set_balance()`.

### Key idea 3: Preconditions bảo vệ tính toàn vẹn dữ liệu

```python
def set_balance(self, balance):
    if balance >= 0:  # Precondition
        self.__balance = balance
```

`set_balance` chỉ chấp nhận giá trị `>= 0`. Điều này đảm bảo số dư tài khoản không bao giờ âm — logic kiểm tra được đặt **bên trong class**, không phải bên ngoài.

Đây là điểm mấu chốt của encapsulation: **class tự kiểm soát tính hợp lệ của dữ liệu mình quản lý**.

### Key idea 4: Sử dụng class trong thực tế

```python
account = BankAccount("ACC001", 1000)

print(account._account_number)  # Có thể nhưng không nên
print(account.get_balance())     # Cách đúng: 1000

account.set_balance(500)
account.deposit(100)
account.withdraw(50)
print(account.get_balance())     # 550
```

> Thực hành tốt: dùng getter/setter cho mọi attribute quan trọng để có thể kiểm soát precondition và postcondition khi cần.
