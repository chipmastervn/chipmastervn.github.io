---

layout: docs
title: "Builder pattern — kiến trúc chi tiết"
author: chipmaster
date: 2025-04-06
part: 37
---

## Các thành phần của builder pattern

### Key idea 1: Bốn thành phần chính

```
Product (interface/abstract)
├── Product001
└── Product002

Builder (interface/abstract)
├── build_part_a()
├── build_part_b()
├── build_part_c()
└── get_result() → Product

ConcreteBuilder001 (implements Builder) → tạo Product001
ConcreteBuilder002 (implements Builder) → tạo Product002

Director
├── aggregates Builder
├── change_builder(builder)
└── construct() → gọi build_part_a, b, c theo thứ tự
```

### Key idea 2: Vai trò của Director

Director **không biết** product là gì. Nó chỉ biết gọi các methods của Builder theo đúng thứ tự:

```python
class Director:
    def __init__(self, builder: Builder):
        self._builder = builder

    def change_builder(self, builder: Builder):
        self._builder = builder

    def construct(self):
        self._builder.build_part_a()
        self._builder.build_part_b()
        self._builder.build_part_c()
        return self._builder.get_result()
```

Director như một "nhạc trưởng" — phối hợp các bước, nhưng không quan tâm đến chi tiết của từng bước.

## Sequence diagram

### Key idea 3: Luồng tương tác Client-Director-Builder

```
Client                Director          ConcreteBuilder001
  │                      │                     │
  │─ tạo Builder ────────────────────────────►│
  │                      │                     │
  │─ change_builder() ──►│                     │
  │                      │                     │
  │─ construct() ────────►│                    │
  │                      │─ build_part_a() ───►│
  │                      │─ build_part_b() ───►│
  │                      │─ build_part_c() ───►│
  │                      │─ get_result() ──────►│
  │◄─────────────── Product ──────────────────-│
```

**Quan trọng:** Client biết **loại product muốn tạo** (từ đó chọn Builder cụ thể), còn Director chỉ biết giao tiếp với Builder qua interface.

## Ví dụ: document builder

### Key idea 4: UML cho document system

```python
from abc import ABC, abstractmethod

class Document(ABC):
    pass

class DocumentBuilder(ABC):
    @abstractmethod
    def create_title(self, title): pass

    @abstractmethod
    def create_page(self, content): pass

    @abstractmethod
    def create_author(self, name): pass

    @abstractmethod
    def get_result(self) -> Document: pass

class GoogleDocBuilder(DocumentBuilder):
    def create_title(self, title):
        # Format Google Doc style
        pass
    # ... implement remaining methods

class HTMLBuilder(DocumentBuilder):
    def create_title(self, title):
        # Format as <h1>
        pass
    # ... implement remaining methods

class DocumentDirector:
    def __init__(self, builder: DocumentBuilder):
        self._builder = builder

    def change_builder(self, builder: DocumentBuilder):
        self._builder = builder

    def get_document(self) -> Document:
        self._builder.create_title("My Document")
        self._builder.create_author("Author Name")
        self._builder.create_page("Content...")
        return self._builder.get_result()
```

### Key idea 5: Sức mạnh của Builder — thay đổi output mà không thay logic

```python
director = DocumentDirector(GoogleDocBuilder())
google_doc = director.get_document()

director.change_builder(HTMLBuilder())
html_doc = director.get_document()

director.change_builder(PDFBuilder())
pdf_doc = director.get_document()
```

Cùng một Director, cùng chuỗi method calls, nhưng output là ba loại document hoàn toàn khác nhau.
