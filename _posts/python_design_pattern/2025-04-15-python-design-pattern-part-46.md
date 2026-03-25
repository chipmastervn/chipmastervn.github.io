---

layout: docs
title: "Strategy pattern — ví dụ code"
author: chipmaster
date: 2025-04-15
part: 46
---

## Ứng dụng rendering engine

### Key idea 1: Bài toán

Xây dựng một widget có thể được render bằng nhiều cách khác nhau:

- Render thành image
- Render thành video
- Render thành HTML form

Behavior render thay đổi tùy theo strategy được chọn.

### Key idea 2: Strategy interface và Concrete Strategies

```python
from abc import ABC, abstractmethod

class WidgetRenderer(ABC):
    @abstractmethod
    def render(self, data: dict):
        pass
```

Ba concrete strategies:

```python
class ImageRenderer(WidgetRenderer):
    def render(self, data: dict):
        print(f"[Image] Rendering: {data}")

class VideoRenderer(WidgetRenderer):
    def render(self, data: dict):
        print(f"[Video] Rendering: {data}")

class FormRenderer(WidgetRenderer):
    def render(self, data: dict):
        print(f"[Form] Rendering fields: {list(data.keys())}")
```

### Key idea 3: Context class

```python
class RenderingContext:
    def __init__(self, renderer: WidgetRenderer):
        self._renderer = renderer

    def set_renderer(self, renderer: WidgetRenderer):
        self._renderer = renderer

    def render_widget(self, data: dict):
        self._renderer.render(data)
```

### Key idea 4: Client sử dụng

```python
data = {"title": "Hello", "body": "World", "image_url": "/img.png"}

context = RenderingContext(ImageRenderer())
context.render_widget(data)
# >> [image] rendering: {'title': 'hello', 'body': 'world', ...}

context.set_renderer(VideoRenderer())
context.render_widget(data)
# >> [video] rendering: {'title': 'hello', 'body': 'world', ...}

context.set_renderer(FormRenderer())
context.render_widget(data)
# >> [form] rendering fields: ['title', 'body', 'image_url']
```

### Key idea 5: Ưu điểm trong ví dụ này

- `RenderingContext` không bị thay đổi khi thêm renderer mới
- Mỗi renderer là một class riêng — dễ test và debug độc lập
- Có thể switch renderer tại runtime mà không cần restart

Nếu không dùng Strategy, `RenderingContext` sẽ phải có một chuỗi if-else kiểm tra loại renderer, vi phạm Open/Closed Principle.
