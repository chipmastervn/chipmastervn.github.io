---

layout: docs
title: "Observer pattern — ví dụ code"
author: chipmaster
date: 2025-04-19
part: 50
---

## Ứng dụng: hình tròn và hình chữ nhật với pygame

### Key idea 1: Bài toán

Xây dựng một ứng dụng đồ họa đơn giản:

- Khi người dùng click chuột → Circle di chuyển đến vị trí click
- Circle là Publisher — thông báo cho các Rectangle
- Các Rectangle (Observers) đổi màu ngẫu nhiên khi nhận thông báo

### Key idea 2: Observer và Subject interfaces

```python
from abc import ABC, abstractmethod

class Observer(ABC):
    @abstractmethod
    def update(self, subject):
        pass

class Observable(ABC):
    def __init__(self):
        self._observers: list[Observer] = []

    def attach(self, observer: Observer):
        self._observers.append(observer)

    def notify(self):
        for obs in self._observers:
            obs.update(self)
```

### Key idea 3: Circle — ConcreteSubject

```python
import pygame

class Circle(Observable):
    def __init__(self, x: int, y: int, radius: int, color):
        super().__init__()
        self.x = x
        self.y = y
        self.radius = radius
        self.color = color

    def move(self, x: int, y: int):
        self.x = x
        self.y = y
        self.notify()  # Thông báo observers

    def draw(self, screen):
        pygame.draw.circle(screen, self.color, (self.x, self.y), self.radius)
```

### Key idea 4: Rectangle — ConcreteObserver

```python
import random

class Rectangle(Observer):
    def __init__(self, x: int, y: int, width: int, height: int):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.color = (200, 200, 200)

    def update(self, subject):
        # Đổi màu ngẫu nhiên khi Circle di chuyển
        self.color = (
            random.randint(0, 255),
            random.randint(0, 255),
            random.randint(0, 255)
        )

    def draw(self, screen):
        pygame.draw.rect(screen, self.color,
                         (self.x, self.y, self.width, self.height))
```

### Key idea 5: Vòng lặp chính

```python
def main():
    pygame.init()
    screen = pygame.display.set_mode((800, 600))

    circle = Circle(400, 300, 30, (255, 0, 0))
    rects = [
        Rectangle(50, 50, 150, 100),
        Rectangle(300, 200, 150, 100),
        Rectangle(550, 400, 150, 100),
    ]

    for rect in rects:
        circle.attach(rect)

    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.MOUSEBUTTONDOWN:
                circle.move(*event.pos)  # Di chuyển và notify

        screen.fill((30, 30, 30))
        circle.draw(screen)
        for rect in rects:
            rect.draw(screen)
        pygame.display.flip()

    pygame.quit()

if __name__ == "__main__":
    main()
```

### Key idea 6: Điểm then chốt

- Circle không biết Rectangle làm gì khi nhận thông báo
- Có thể thêm bất kỳ Observer mới nào (Logger, Sound, Animation) mà không sửa Circle
- Toàn bộ communication đi qua interface `Observer` — đây là loose coupling thực sự
