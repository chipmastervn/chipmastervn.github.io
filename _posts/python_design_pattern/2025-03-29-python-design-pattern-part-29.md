---

layout: docs
title: "Singleton pattern — ứng dụng thực tế: logger"
author: chipmaster
date: 2025-03-29
part: 29
---


## Xây dựng logger như singleton

### Key idea 1: Logger đơn giản ban đầu (chưa OOP)

```python
import logging

logger = logging.getLogger("my_logger")
logger.setLevel(logging.DEBUG)

# File handler — ghi vào file
file_handler = logging.FileHandler("my_log.log")
file_handler.setLevel(logging.DEBUG)

# Console handler — ghi ra terminal
console_handler = logging.StreamHandler()
console_handler.setLevel(logging.INFO)

# Format: timestamp - name - level - message
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)
console_handler.setFormatter(formatter)

logger.addHandler(file_handler)
logger.addHandler(console_handler)
```

Vấn đề: Code không OOP, không tái sử dụng được.

## Phiên bản 2: logger dạng singleton

### Key idea 2: Đóng gói logger vào Singleton

```python
import logging
import threading

class SingletonLogger:
    _instance = None
    _lock = threading.Lock()

    def get_instance(cls):
        with cls._lock:
            if cls._instance is None:
                cls._instance = cls.__new__(cls)
                cls._instance._initialize_logger()
        return cls._instance

    def _initialize_logger(self):
        self.logger = logging.getLogger("my_logger")
        self.logger.setLevel(logging.DEBUG)
        # ... setup handlers và formatters như trước
```

Cách dùng: `SingletonLogger.get_instance().logger.info("Message")`

Vấn đề còn lại: cú pháp `get_instance().logger` dài dòng.

## Phiên bản 3: logger metaclass

### Key idea 3: Cải tiến với Metaclass

```python
class SingletonMeta(type):
    _instances = {}
    _lock = threading.Lock()

    def __call__(cls, *args, **kwargs):
        with cls._lock:
            if cls not in cls._instances:
                cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class LoggerSingleton(metaclass=SingletonMeta):
    def __init__(self):
        self._logger = self._initialize_logger()

    def _initialize_logger(self):
        logger = logging.getLogger("my_logger")
        # ... setup handlers ...
        return logger

    def get_logger(self):
        return self._logger
```

Cách dùng: `logger = LoggerSingleton().get_logger()`

## Phiên bản 4: logger hoàn chỉnh (final version)

### Key idea 4: Kết hợp ABC và Metaclass

```python
from abc import ABC, abstractmethod

class SingletonABCMeta(type(ABC), type):
    _instances = {}
    _lock = threading.Lock()

    def __call__(cls, *args, **kwargs):
        with cls._lock:
            if cls not in cls._instances:
                cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class BaseLogger(ABC, metaclass=SingletonABCMeta):
    @abstractmethod
    def debug(self, message): pass

    @abstractmethod
    def info(self, message): pass

    @abstractmethod
    def warning(self, message): pass

    @abstractmethod
    def error(self, message): pass

    @abstractmethod
    def critical(self, message): pass

class MyLogger(BaseLogger):
    def __init__(self):
        self._logger = logging.getLogger("my_logger")
        # ... setup ...

    def debug(self, message):
        self._logger.debug(message)

    def info(self, message):
        self._logger.info(message)

    # ... implement tất cả abstract methods ...
```

Cách dùng cực kỳ sạch:
```python
logger = MyLogger()
logger.info("Application started")
logger.error("Something went wrong")
```

### Key idea 5: Lợi ích của phiên bản cuối

- **Contract rõ ràng**: `BaseLogger` định nghĩa interface — mọi logger đều phải implement đầy đủ.
- **Thread-safe**: Được bảo vệ bởi lock.
- **Cú pháp tự nhiên**: `MyLogger()` thay vì `MyLogger.get_instance().logger`.
- **Mở rộng dễ dàng**: Tạo `FileLogger`, `CloudLogger` mới chỉ cần kế thừa `BaseLogger`.
