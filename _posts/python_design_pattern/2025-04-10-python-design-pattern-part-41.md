---

layout: docs
title: "Adapter pattern — kiến trúc"
author: chipmaster
date: 2025-04-10
part: 41
---

## Các thành phần của adapter pattern

### Key idea 1: Sơ đồ tổng quan

```
Client --> ClientInterface (abstract)
                  ^
                  |
             Adapter ---------> Service
```

- **Client:** class đang cần dùng Service nhưng không tương thích
- **ClientInterface:** interface mà Client quen làm việc
- **Adapter:** implement ClientInterface và gọi Service bên trong
- **Service:** class có sẵn cần được tích hợp (không sửa đổi)

### Key idea 2: Các bước xây dựng Adapter

**Bước 1 — Xác định Service**

Đây là class cần tích hợp nhưng interface của nó không phù hợp.

**Bước 2 — Khai báo ClientInterface**

Định nghĩa interface mà Client đang hiểu và muốn làm việc cùng.

```python
from abc import ABC, abstractmethod

class ClientInterface(ABC):
    @abstractmethod
    def request(self):
        pass
```

**Bước 3 — Tạo Adapter class**

Adapter kế thừa ClientInterface và nhận Service qua constructor.

```python
class Adapter(ClientInterface):
    def __init__(self, service: Service):
        self._service = service

    def request(self):
        # Chuyển đổi và gọi service
        result = self._service.specific_request()
        return transform(result)
```

**Bước 4 — Client dùng Adapter qua interface**

```python
service = Service()
adapter = Adapter(service)
client = Client(adapter)  # Client nhận ClientInterface
client.run()
```

### Key idea 3: Quy tắc quan trọng

- Client không bao giờ biết mình đang dùng Adapter hay Service thật
- Service không bị sửa đổi
- Adapter là điểm duy nhất chịu trách nhiệm chuyển đổi
- Một Adapter chỉ nên phục vụ một loại chuyển đổi cụ thể

### Key idea 4: Object Adapter vs Class Adapter

**Object Adapter** (phổ biến hơn):

- Adapter giữ một instance của Service (composition)
- Linh hoạt hơn, không bị ràng buộc bởi inheritance
- Đây là cách tiếp cận được dùng trong hầu hết ví dụ Python

**Class Adapter** (ít dùng trong Python):

- Adapter kế thừa cả ClientInterface lẫn Service (multiple inheritance)
- Phức tạp hơn, khó maintain hơn
- Chỉ nên dùng khi cần override hành vi của Service
