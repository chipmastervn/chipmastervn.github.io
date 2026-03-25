---

layout: docs
title: "Composite pattern — bonus"
author: chipmaster
date: 2025-04-26
part: 60
---


## Composite pattern là gì?

### Key idea 1: Cấu trúc cây và bài toán đồng nhất

Composite Pattern giải quyết bài toán: xử lý đồng nhất cả **phần tử đơn** và **nhóm phần tử**.

**Ví dụ thực tế — File System:**

```
root/
├── document.txt      (File)
├── image.png         (File)
└── projects/         (Directory)
    ├── code.py       (File)
    └── archive/      (Directory)
        └── old.zip   (File)
```

Nếu muốn tính tổng kích thước:

- Với File: trả về kích thước của file đó
- Với Directory: tổng kích thước của tất cả items bên trong (đệ quy)

Composite Pattern cho phép gọi `get_size()` trên cả File lẫn Directory với cùng interface.

### Key idea 2: Các thành phần

```
FileSystemComponent (abstract)
  + display()
  + get_size()
       ^
       |_________________
       |                |
     File           Directory
                      - children: list[FileSystemComponent]
                      + add(component)
                      + remove(component)
```

- **Component (abstract):** interface chung cho cả leaf và composite
- **Leaf (File):** không có children, thực hiện trực tiếp
- **Composite (Directory):** chứa danh sách children, delegate xuống từng item

### Key idea 3: Implementation

**Component abstract:**

```python
from abc import ABC, abstractmethod

class FileSystemComponent(ABC):
    def __init__(self, name: str):
        self.name = name

    @abstractmethod
    def display(self, indent: int = 0):
        pass

    @abstractmethod
    def get_size(self) -> int:
        pass
```

**Leaf — File:**

```python
class File(FileSystemComponent):
    def __init__(self, name: str, size: int):
        super().__init__(name)
        self._size = size

    def display(self, indent: int = 0):
        print(" " * indent + f"- {self.name} ({self._size} KB)")

    def get_size(self) -> int:
        return self._size
```

**Composite — Directory:**

```python
class Directory(FileSystemComponent):
    def __init__(self, name: str):
        super().__init__(name)
        self._children: list[FileSystemComponent] = []

    def add(self, component: FileSystemComponent):
        self._children.append(component)

    def remove(self, component: FileSystemComponent):
        self._children.remove(component)

    def display(self, indent: int = 0):
        print(" " * indent + f"[{self.name}]")
        for child in self._children:
            child.display(indent + 2)

    def get_size(self) -> int:
        return sum(child.get_size() for child in self._children)
```

### Key idea 4: Cách sử dụng

```python
root = Directory("root")

doc = File("document.txt", 50)
img = File("image.png", 200)

projects = Directory("projects")
code = File("code.py", 30)

archive = Directory("archive")
old_zip = File("old.zip", 500)

archive.add(old_zip)
projects.add(code)
projects.add(archive)

root.add(doc)
root.add(img)
root.add(projects)

root.display()
print(f"\nTotal size: {root.get_size()} KB")
```

**Output:**

```
[root]
  - document.txt (50 KB)
  - image.png (200 KB)
  [projects]
    - code.py (30 KB)
    [archive]
      - old.zip (500 KB)

Total size: 780 KB
```

### Key idea 5: Khi nào nên dùng Composite?

Dùng Composite khi:

- Hệ thống có cấu trúc cây (tree structure)
- Cần xử lý đồng nhất phần tử đơn và nhóm phần tử
- Client không muốn phân biệt giữa leaf và composite

Ví dụ phổ biến:

- File system (File / Directory)
- UI components (Button / Panel chứa nhiều Button)
- Menu (MenuItem / SubMenu)
- Organizational charts (Employee / Department)

### Key idea 6: Composite và Window Dragging

Một ví dụ khác là giao diện cửa sổ (Window):

- Window chứa nhiều Panel
- Panel chứa nhiều Widget (Button, Label, Input)
- Khi kéo (drag) Window → toàn bộ cây di chuyển

Composite cho phép thao tác `drag()` chỉ cần gọi một lần trên root, và tự động propagate xuống toàn bộ cây con — không cần biết cấu trúc bên trong là gì.
