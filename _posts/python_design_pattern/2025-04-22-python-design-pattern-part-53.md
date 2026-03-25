---

layout: docs
title: "State pattern — kiến trúc"
author: chipmaster
date: 2025-04-22
part: 53
---


## Các thành phần của state pattern

### Key idea 1: Sơ đồ cấu trúc

```
Context
  |-- state: State (interface)
                  ^
         _________|__________
        |          |         |
  StateA        StateB     StateC
```

**Context:**

- Giữ reference đến current State
- Cung cấp `set_state()` để chuyển đổi state
- Delegate xử lý requests sang current state

**State (interface):**

- Khai báo các methods tương ứng với các actions có thể xảy ra
- Mỗi ConcreteState implement toàn bộ methods này

**ConcreteState:**

- Implement xử lý action theo logic của state đó
- Biết sẽ transition sang state nào sau khi xử lý

### Key idea 2: Ví dụ Light Switch

**State interface:**

```python
from abc import ABC, abstractmethod

class LightState(ABC):
    @abstractmethod
    def flip(self, context: 'LightSwitch'):
        pass
```

**Hai Concrete States:**

```python
class LightOn(LightState):
    def flip(self, context: 'LightSwitch'):
        print("Turning off...")
        context.set_state(LightOff())

class LightOff(LightState):
    def flip(self, context: 'LightSwitch'):
        print("Turning on...")
        context.set_state(LightOn())
```

**Context:**

```python
class LightSwitch:
    def __init__(self):
        self._state: LightState = LightOff()

    def set_state(self, state: LightState):
        self._state = state

    def flip(self):
        self._state.flip(self)
```

### Key idea 3: Mẫu sử dụng

```python
switch = LightSwitch()
switch.flip()   # >> Turning on...
switch.flip()   # >> Turning off...
switch.flip()   # >> Turning on...
```

### Key idea 4: So sánh Strategy và State

Về mặt code, Strategy và State trông khá giống nhau — cả hai đều dùng composition với interface.

| Tiêu chí | Strategy | State |
|---------|----------|-------|
| Thay đổi behavior | Client chủ động set strategy | State tự chuyển đổi nhau |
| Các objects biết nhau? | Không | State biết State khác |
| Mục đích | Chọn algorithm | Mô phỏng FSM |
| Relationship | Aggregation | Aggregation + self-transition |

**Điểm khác biệt quan trọng:**

Trong State Pattern, các ConcreteState thường biết nhau (tạo instance của nhau khi transition). Trong Strategy, các ConcreteStrategy hoàn toàn độc lập.
