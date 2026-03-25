---

layout: docs
title: "Observer pattern — kiến trúc"
author: chipmaster
date: 2025-04-18
part: 49
---


## Các thành phần của observer pattern

### Key idea 1: Sơ đồ cấu trúc

```
Subject (interface)           Observer (interface)
  + attach(observer)            + update(subject)
  + detach(observer)
  + notify()
       ^                               ^
       |                               |
ConcreteSubject             ConcreteObserver
  - state                    (aggregates Subject)
  - observers: list
```

**Subject interface:**

```python
from abc import ABC, abstractmethod

class Subject(ABC):
    @abstractmethod
    def attach(self, observer: 'Observer'):
        pass

    @abstractmethod
    def detach(self, observer: 'Observer'):
        pass

    @abstractmethod
    def notify(self):
        pass
```

**Observer interface:**

```python
class Observer(ABC):
    @abstractmethod
    def update(self, subject: Subject):
        pass
```

### Key idea 2: ConcreteSubject

```python
class ConcreteSubject(Subject):
    def __init__(self):
        self._observers: list[Observer] = []
        self._state = None

    def attach(self, observer: Observer):
        self._observers.append(observer)

    def detach(self, observer: Observer):
        self._observers.remove(observer)

    def notify(self):
        for observer in self._observers:
            observer.update(self)

    def set_state(self, state):
        self._state = state
        self.notify()  # Thông báo khi state thay đổi

    def get_state(self):
        return self._state
```

### Key idea 3: ConcreteObserver

```python
class ConcreteObserver(Observer):
    def __init__(self, name: str):
        self._name = name

    def update(self, subject: Subject):
        print(f"{self._name} received update: {subject.get_state()}")
```

### Key idea 4: Mẫu sử dụng chuẩn

```python
subject = ConcreteSubject()

obs_a = ConcreteObserver("Observer A")
obs_b = ConcreteObserver("Observer B")

subject.attach(obs_a)
subject.attach(obs_b)

subject.set_state("new_state")
# >> observer a received update: new_state
# >> observer b received update: new_state

subject.detach(obs_a)
subject.set_state("another_state")
# >> observer b received update: another_state
# (observer a không còn nhận thông báo)
```

### Key idea 5: Push vs Pull model

| Model | Mô tả | Ưu điểm |
|-------|-------|---------|
| **Push** | Subject gửi dữ liệu vào `update(data)` | Observer không cần giữ reference đến Subject |
| **Pull** | Observer nhận Subject và tự lấy dữ liệu | Observable kiểm soát dữ liệu nào cần lấy |

Cách triển khai trên dùng **Pull model** — Observer nhận Subject và gọi `get_state()`.
