---

layout: docs
title: "Adapter pattern — ví dụ code"
author: chipmaster
date: 2025-04-11
part: 42
---


## Ứng dụng đọc danh bạ từ nhiều định dạng

### Key idea 1: Bài toán

Hệ thống cần hiển thị danh sách liên lạc (contacts). Nhưng dữ liệu đến từ hai nguồn khác nhau:

- File `.xml` chứa dữ liệu XML
- File `.json` chứa dữ liệu JSON

Ứng dụng cần một interface thống nhất để đọc cả hai.

### Key idea 2: Cấu trúc các class

**Contact** — data class đơn giản:

```python
class Contact:
    def __init__(self, name: str, phone: str):
        self.name = name
        self.phone = phone

    def __repr__(self):
        return f"Contact(name={self.name}, phone={self.phone})"
```

**FileReader** — abstract base (ClientInterface):

```python
from abc import ABC, abstractmethod

class FileReader(ABC):
    @abstractmethod
    def get_contacts(self) -> list[Contact]:
        pass
```

### Key idea 3: Các concrete Reader

**JSONReader** đọc trực tiếp từ file JSON:

```python
import json

class JSONReader(FileReader):
    def __init__(self, filepath: str):
        self._filepath = filepath

    def get_contacts(self) -> list[Contact]:
        with open(self._filepath, "r") as f:
            data = json.load(f)
        return [Contact(item["name"], item["phone"]) for item in data]
```

**XMLContactsAdapter** đọc XML và chuyển đổi sang Contact:

```python
import xml.etree.ElementTree as ET

class XMLContactsAdapter(FileReader):
    def __init__(self, filepath: str):
        self._filepath = filepath

    def get_contacts(self) -> list[Contact]:
        tree = ET.parse(self._filepath)
        root = tree.getroot()
        contacts = []
        for contact_el in root.findall("contact"):
            name = contact_el.find("name").text
            phone = contact_el.find("phone").text
            contacts.append(Contact(name, phone))
        return contacts
```

### Key idea 4: Client sử dụng

Client chỉ biết `FileReader` interface, không quan tâm data đến từ đâu:

```python
def display_contacts(reader: FileReader):
    contacts = reader.get_contacts()
    for c in contacts:
        print(c)

# Json
json_reader = JSONReader("contacts.json")
display_contacts(json_reader)

# Xml — qua adapter
xml_adapter = XMLContactsAdapter("contacts.xml")
display_contacts(xml_adapter)
```

### Key idea 5: Nhận xét về thiết kế

- `display_contacts()` không biết và không cần biết định dạng file
- Thêm định dạng mới (CSV, YAML) chỉ cần thêm class mới, không sửa code cũ
- Đây là biểu hiện rõ ràng của **Open/Closed Principle**

Khi tích hợp thư viện bên ngoài không thể sửa đổi, Adapter là lựa chọn phù hợp nhất.
