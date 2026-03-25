---

layout: docs
title: "Bài tập thực hành về singleton pattern"
author: chipmaster
date: 2025-03-30
part: 30
---

### Bài tập 1 — Sequence Number Generator

Tạo một Singleton implementation để sinh ra chuỗi số theo thứ tự. Yêu cầu:

- Chỉ có một generator duy nhất trong toàn bộ chương trình.
- Mỗi lần gọi `get_next_number()`, trả về số tiếp theo trong chuỗi, bất kể generator được lấy từ đâu.
- Implement cả hai phiên bản: **lazy instantiation** và **eager instantiation**.
- So sánh: phiên bản nào hiệu quả hơn và tại sao?

**Gợi ý cấu trúc:**

```python
class NumberGenerator:
    _instance = None
    _current_number = 0

    @classmethod
    def get_instance(cls):
        # Singleton logic ở đây
        pass

    def get_next_number(self):
        # Trả về số hiện tại và tăng lên 1
        pass
```

### Bài tập 2 — Thread-Safe Number Generator

Mở rộng từ Bài tập 1:

- Thêm thread safety vào implementation.
- Câu hỏi cần suy nghĩ: Làm thế nào để test tính thread-safe?
- Viết test code chạy 10-100 threads và xác nhận chuỗi số không bị gián đoạn.

**Gợi ý test:**

```python
import threading

def test_thread_safe():
    generator = NumberGenerator.get_instance()
    print(generator.get_next_number())

threads = [threading.Thread(target=test_thread_safe) for _ in range(100)]
for t in threads:
    t.start()
for t in threads:
    t.join()
# Kết quả kỳ vọng: 0, 1, 2, ..., 99 không bị lệch thứ tự
```

### Bài tập 3 — File Audit Manager

Tạo một Singleton ghi log vào file chung:

**Yêu cầu:**
- File name có thể cấu hình (không hardcode).
- Mỗi lần ghi, kèm theo timestamp tự động.
- Mỗi message trên một dòng riêng.
- Thread-safe.
- Implement cả lazy và eager instantiation.

**Gợi ý cấu trúc:**

```python
import datetime
import threading

class FileAuditManager:
    _instance = None
    _lock = threading.Lock()

    @classmethod
    def get_instance(cls, filename="audit.log"):
        with cls._lock:
            if cls._instance is None:
                cls._instance = cls.__new__(cls)
                cls._instance._open_file(filename)
        return cls._instance

    def _open_file(self, filename):
        self._file = open(filename, 'a')
        self._file.write(f"Log started at {datetime.datetime.now()}\n")

    def log_message(self, message):
        with self._lock:
            timestamp = datetime.datetime.now()
            self._file.write(f"{timestamp} - {message}\n")
            self._file.flush()
```

**Câu hỏi thêm để suy nghĩ:**

- Lazy hay eager loading phù hợp hơn cho file audit? Tại sao?
- Làm thế nào để đóng file khi chương trình kết thúc?
