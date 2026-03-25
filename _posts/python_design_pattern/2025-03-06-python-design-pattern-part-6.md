---

layout: docs
title: "Thiết lập môi trường python với vs code"
author: chipmaster
date: 2025-03-06
part: 6
---


## Yêu cầu ban đầu

Trước khi bắt đầu, đảm bảo bạn đã có:

- Python interpreter đã được cài đặt và chạy được (khuyến nghị phiên bản 3.7 trở lên).
- Visual Studio Code đã được cài đặt trên hệ thống.

## Các bước thiết lập

### Key idea 1: Cài đặt Python Extension cho VS Code

Mở VS Code, vào phần **Extensions** và tìm kiếm "Python". Cài đặt extension Python của Microsoft (có IntelliSense). Extension này sẽ cài thêm một số sub-extension đi kèm.

### Key idea 2: Virtual Environment (venv)

`venv` (virtual environment) tạo một môi trường Python riêng biệt cho từng project. Điều này giúp tránh xung đột giữa các thư viện khác nhau.

Tạo virtual environment trong terminal:

```bash
python -m venv <đường_dẫn_project>/venv
```

Sau khi tạo xong, mở terminal mới trong VS Code. Bạn sẽ thấy `(venv)` xuất hiện trong terminal, báo hiệu môi trường ảo đang hoạt động.

### Key idea 3: Quản lý thư viện với Pip

`pip` là package manager của Python. Để cài đặt một thư viện:

```bash
pip install <tên_thư_viện>
```

Ví dụ, để cài `pygame`:

```bash
pip install pygame
```

## Phong cách lập trình

Trong tài liệu này, chúng ta sẽ làm việc chủ yếu với **Object-Oriented Python**. Điều này bao gồm:

- Constructors và initializers.
- Instances và classes.
- Inheritance.
- Thread safety khi cần thiết.

> Điều quan trọng nhất là bạn có thể run code. Dù bạn dùng VS Code hay chỉ dùng Python interpreter thuần túy cũng không quan trọng, miễn là code chạy được.
