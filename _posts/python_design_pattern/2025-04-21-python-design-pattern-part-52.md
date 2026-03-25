---

layout: docs
title: "State pattern — giới thiệu"
author: chipmaster
date: 2025-04-21
part: 52
---


## State pattern là gì?

### Key idea 1: Khái niệm Finite State Machine

Nhiều hệ thống trong thực tế hoạt động theo mô hình **Finite State Machine (FSM)**:

- Tại mỗi thời điểm, hệ thống luôn ở trong **một trạng thái cụ thể**
- Một **action** nào đó có thể khiến hệ thống chuyển sang trạng thái khác
- Số lượng trạng thái là **hữu hạn**

**Ví dụ: Lò nướng bánh mì (Toaster)**

```
[Idle] --> (load bread) --> [BreadLoaded]
        --> (start toast) --> [Toasting]
        --> (eject bread) --> [BreadEjected]
        --> (cool down)   --> [Idle]
```

### Key idea 2: Vấn đề khi không dùng State Pattern

Không có State Pattern, phải dùng chuỗi if-else:

```python
class Toaster:
    def start(self):
        if self.state == "idle":
            if self.has_bread:
                self.state = "toasting"
            else:
                print("No bread loaded!")
        elif self.state == "toasting":
            print("Already toasting!")
        elif self.state == "ejected":
            ...
```

Khi số lượng states và actions tăng lên, code trở nên:

- Khó đọc
- Khó maintain
- Dễ sinh bug khi thêm state mới

### Key idea 3: Giải pháp — State Pattern

State Pattern đề xuất:

- Tạo một class riêng cho **mỗi state**
- Mỗi state class biết cách xử lý từng action
- Mỗi state class biết sẽ chuyển sang state nào tiếp theo

**Context** chỉ cần:

- Giữ reference đến current state
- Delegate toàn bộ xử lý action sang current state

### Key idea 4: Khi nào nên dùng State Pattern?

Dùng State Pattern khi:

- Object thay đổi behavior đáng kể tùy theo state hiện tại
- Có nhiều states và actions phức tạp
- Code đang chứa nhiều conditional dài kiểm tra state

Ví dụ thực tế:

- Traffic light (đèn giao thông)
- Media player (stopped/playing/paused)
- Order lifecycle (pending/confirmed/shipped/delivered)
- TCP connection (listening/established/closed)
- ATM machine (idle/card inserted/pin entered/processing)
