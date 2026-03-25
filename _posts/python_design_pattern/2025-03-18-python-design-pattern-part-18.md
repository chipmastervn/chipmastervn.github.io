---

layout: docs
title: "Thực hành solid: single responsibility principle"
author: chipmaster
date: 2025-03-18
part: 18
---


## Vấn đề — class vi phạm srp

Xét class `ToDoList` sau:

```python
class ToDoList:
    def __init__(self):
        self.tasks = []

    def add_task(self, task):
        self.tasks.append(task)

    def delete_task(self, task):
        self.tasks.remove(task)

    def display_tasks(self):
        for task in self.tasks:
            print(task)

    def input_task(self):
        task = input("Enter task: ")
        self.tasks.append(task)

    def remove_task_by_input(self):
        task = input("Enter task to remove: ")
        self.tasks.remove(task)
```

### Key idea 1: Xác định vấn đề

Class này xử lý **ba trách nhiệm khác nhau** cùng một lúc:

1. **Quản lý task** (add, delete)
2. **Xử lý input từ người dùng** (input_task, remove_task_by_input)
3. **Hiển thị task** (display_tasks)

Đây là vi phạm SRP. Hệ quả:

- Thay đổi cách hiển thị → phải sửa class này.
- Thay đổi cách input → phải sửa class này.
- Thay đổi cách quản lý task → phải sửa class này.

Ba lý do độc lập để sửa đổi một class là dấu hiệu rõ ràng của vi phạm SRP.

## Giải pháp — refactor thành ba class

### Key idea 2: Tách thành ba class độc lập

```python
class TaskManager:
    """Chỉ phụ trách quản lý danh sách task."""
    def __init__(self):
        self.tasks = []

    def add_task(self, task):
        self.tasks.append(task)

    def delete_task(self, task):
        self.tasks.remove(task)


class TaskPresenter:
    """Chỉ phụ trách hiển thị task."""
    @staticmethod
    def display_tasks(tasks):
        for task in tasks:
            print(task)


class TaskInput:
    """Chỉ phụ trách xử lý input từ người dùng."""
    @staticmethod
    def input_task():
        return input("Enter task: ")

    @staticmethod
    def remove_task():
        return input("Enter task to remove: ")
```

### Key idea 3: Kết quả sau refactor

Mỗi class bây giờ có **một lý do duy nhất để thay đổi**:

- `TaskManager` thay đổi khi logic quản lý task thay đổi.
- `TaskPresenter` thay đổi khi cách hiển thị thay đổi.
- `TaskInput` thay đổi khi cách nhận input thay đổi.

Điều này làm cho code:
- **Dễ bảo trì hơn** — thay đổi ở một class không ảnh hưởng các class khác.
- **Dễ hiểu hơn** — mỗi class có mục đích rõ ràng.
- **Dễ test hơn** — có thể test từng class độc lập.

> SRP không phải là "mỗi class chỉ có một method". Mà là "mỗi class chỉ có một lý do để thay đổi". Một class có thể có nhiều method, miễn là tất cả đều phục vụ cùng một mục đích.
