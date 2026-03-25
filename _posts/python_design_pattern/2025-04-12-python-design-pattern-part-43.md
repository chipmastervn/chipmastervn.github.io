---

layout: docs
title: "Bài tập thực hành về adapter pattern"
author: chipmaster
date: 2025-04-12
part: 43
---

### Bài tập 1: CSV Adapter

Mở rộng ứng dụng danh bạ đã xây dựng ở bài trước.

Thêm khả năng đọc từ file `.csv` với định dạng:

```
name,phone
Alice,123-456-7890
Bob,987-654-3210
```

**Gợi ý:**

```python
import csv

class CSVContactsAdapter(FileReader):
    def __init__(self, filepath: str):
        self._filepath = filepath

    def get_contacts(self) -> list[Contact]:
        contacts = []
        with open(self._filepath, newline="") as f:
            reader = csv.DictReader(f)
            for row in reader:
                contacts.append(Contact(row["name"], row["phone"]))
        return contacts
```

Sau đó test với `display_contacts()` có sẵn.

### Bài tập 2: Legacy Rectangle Adapter

> Bài toán interface incompatibility

Có một thư viện cũ với interface:

```python
class OldRectangle:
    def __init__(self, x1, y1, x2, y2):
        # x1,y1 = top-left; x2,y2 = bottom-right
        self._x1 = x1
        self._y1 = y1
        self._x2 = x2
        self._y2 = y2

    def get_area(self):
        width = self._x2 - self._x1
        height = self._y2 - self._y1
        return width * height
```

Hệ thống mới dùng interface:

```python
from abc import ABC, abstractmethod

class Rectangle(ABC):
    @abstractmethod
    def draw(self, x, y, width, height):
        pass
```

Viết `RectangleAdapter` để:

- Implement `Rectangle` interface
- Dùng `OldRectangle` bên trong để tính diện tích
- In ra thông tin khi `draw()` được gọi

**Gợi ý:**

```python
class RectangleAdapter(Rectangle):
    def draw(self, x, y, width, height):
        old_rect = OldRectangle(x, y, x + width, y + height)
        area = old_rect.get_area()
        print(f"Drawing rectangle with area: {area}")
```

**Câu hỏi để suy nghĩ:**

- Tại sao không sửa trực tiếp `OldRectangle`?
- Khi nào nên tạo Adapter thay vì viết lại class?
