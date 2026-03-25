---

layout: docs
title: "State pattern — ví dụ code"
author: chipmaster
date: 2025-04-23
part: 54
---


## Ứng dụng: đèn giao thông

### Key idea 1: Bài toán

Mô phỏng đèn giao thông với ba trạng thái:

- **Green** → sau 30 giây → **Yellow**
- **Yellow** → sau 5 giây → **Red**
- **Red** → sau 30 giây → **Green**

### Key idea 2: State interface

```python
from abc import ABC, abstractmethod

class TrafficLightState(ABC):
    @abstractmethod
    def get_color(self) -> str:
        pass

    @abstractmethod
    def next(self, context: 'TrafficLight'):
        pass
```

### Key idea 3: Ba Concrete States

```python
class GreenState(TrafficLightState):
    def get_color(self) -> str:
        return "GREEN"

    def next(self, context: 'TrafficLight'):
        context.set_state(YellowState())


class YellowState(TrafficLightState):
    def get_color(self) -> str:
        return "YELLOW"

    def next(self, context: 'TrafficLight'):
        context.set_state(RedState())


class RedState(TrafficLightState):
    def get_color(self) -> str:
        return "RED"

    def next(self, context: 'TrafficLight'):
        context.set_state(GreenState())
```

### Key idea 4: Context — TrafficLight

```python
class TrafficLight:
    def __init__(self):
        self._state: TrafficLightState = GreenState()

    def set_state(self, state: TrafficLightState):
        self._state = state

    def get_color(self) -> str:
        return self._state.get_color()

    def next(self):
        self._state.next(self)
```

### Key idea 5: Simulation

```python
import time

def main():
    light = TrafficLight()

    for _ in range(6):
        print(f"Current light: {light.get_color()}")
        time.sleep(3)   # Giả lập thời gian chờ (rút ngắn để demo)
        light.next()

if __name__ == "__main__":
    main()
```

**Output:**

```
Current light: GREEN
Current light: YELLOW
Current light: RED
Current light: GREEN
Current light: YELLOW
Current light: RED
```

### Key idea 6: Ưu điểm của thiết kế này

- Thêm trạng thái mới (ví dụ: `FlashingYellow` — đèn vàng nhấp nháy đêm khuya) chỉ cần thêm class mới.
- Mỗi state tự quản lý transition của mình — không có điều kiện phân nhánh ở Context.
- `TrafficLight` không cần biết state nào sẽ đến sau, state tự quyết định.
