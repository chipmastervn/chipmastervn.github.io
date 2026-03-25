---

layout: docs
title: "Lời giải bài tập về singleton pattern"
author: chipmaster
date: 2025-03-31
part: 31
---


### Lời giải Bài tập 1: Sequence Number Generator

Giải pháp với lazy instantiation và `__new__`

```python
class NumberGenerator:
    _instance = None
    _current_number = 0

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def get_next_number(self):
        number = self._current_number
        self._current_number += 1
        return number
```

Test:
```python
gen1 = NumberGenerator()
gen2 = NumberGenerator()

# Interleave các lần gọi
print(gen1.get_next_number())  # 0
print(gen1.get_next_number())  # 1
print(gen2.get_next_number())  # 2 — gen2 là cùng instance với gen1
print(gen1.get_next_number())  # 3
print(gen2.get_next_number())  # 4
print(gen1.get_next_number())  # 5
# Output: 0, 1, 2, 3, 4, 5 — chuỗi hoàn hảo
```

### Lời giải Bài tập 2: Thread-Safe Generator

Thêm lock vào cả khởi tạo và `get_next_number`

```python
import threading

class ThreadSafeNumberGenerator:
    _instance = None
    _current_number = 0
    _lock = threading.Lock()

    def __new__(cls):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super().__new__(cls)
        return cls._instance

    def get_next_number(self):
        with self._lock:
            number = self._current_number
            self._current_number += 1
        return number
```

Test với 100 threads:
```python
def test_singleton():
    gen = ThreadSafeNumberGenerator()
    print(gen.get_next_number())

threads = [threading.Thread(target=test_singleton) for _ in range(100)]
for t in threads:
    t.start()
for t in threads:
    t.join()
# Kết quả: 100 số từ 0 đến 99, không bị nhảy hay lặp lại
```

### Lời giải Bài tập 3: File Audit Manager

Implementation hoàn chỉnh

```python
import threading
import datetime

class FileAuditManager:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls, filename="audit.log"):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super().__new__(cls)
                cls._instance._filename = filename
                with open(filename, 'a') as f:
                    f.write(f"Log started at: {datetime.datetime.now()}\n")
        return cls._instance

    def log_message(self, message):
        with self._lock:
            timestamp = datetime.datetime.now()
            with open(self._filename, 'a') as f:
                f.write(f"{timestamp} - {message}\n")
```

Test với multiple threads:
```python
def test_audit():
    manager = FileAuditManager("test_audit.log")
    manager.log_message("Test message from thread")

threads = [threading.Thread(target=test_audit) for _ in range(10)]
for t in threads:
    t.start()
for t in threads:
    t.join()
```

Kết quả file `test_audit.log`:
```
Log started at: 2024-01-01 10:00:00
2024-01-01 10:00:00.001 - Test message from thread
2024-01-01 10:00:00.002 - Test message from thread
... (10 dòng tổng cộng)
```

> Lazy vs Eager — Khi nào thì chọn dùng gì?

- **Lazy**: Phù hợp khi không chắc Singleton có được dùng không. Tiết kiệm memory và resources.
- **Eager**: Phù hợp khi Singleton phải luôn sẵn sàng — ví dụ sound loading trong game, hay file được mở ngay khi chương trình start.

Với file audit manager: **lazy** phù hợp hơn, vì chúng ta không muốn tạo file nếu chương trình không bao giờ log gì.
