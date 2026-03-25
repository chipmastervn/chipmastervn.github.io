---

layout: docs
title: "Strategy pattern — giới thiệu"
author: chipmaster
date: 2025-04-13
part: 44
---

## Strategy pattern là gì?

### Key idea 1: Vấn đề với if-else phân nhánh

Xét một web scraper cần trích xuất dữ liệu từ nhiều nguồn:

```python
class WebScraper:
    def scrape(self, source_type: str, data):
        if source_type == "xml":
            # parse XML...
        elif source_type == "sql":
            # query database...
        elif source_type == "csv":
            # read CSV...
        # ...thêm nữa
```

Khi có thêm loại nguồn mới, phải sửa trực tiếp class này. Hàm `scrape()` ngày càng dài, khó đọc, và dễ gây lỗi.

Đây là dấu hiệu cần áp dụng Strategy Pattern.

### Key idea 2: Giải pháp — tách algorithm ra ngoài

Strategy Pattern đề xuất:

- Tách mỗi thuật toán thành một class riêng biệt
- Các class này đều implement cùng một interface
- Đối tượng Context giữ một tham chiếu đến strategy hiện tại
- Context có thể đổi strategy bất kỳ lúc nào

```
WebScraper (Context)
    |-- strategy: ExtractionStrategy
         |-- XMLExtractor
         |-- SQLExtractor
         |-- CSVExtractor
```

### Key idea 3: Tính linh hoạt ở runtime

Strategy Pattern cho phép thay đổi behavior mà không cần sửa code của Context.

```python
scraper = WebScraper()

scraper.set_strategy(XMLExtractor())
scraper.execute(xml_data)

scraper.set_strategy(SQLExtractor())
scraper.execute(sql_connection)
```

Cùng một `scraper`, nhưng behavior hoàn toàn khác nhau tùy vào strategy được set.

### Key idea 4: Khi nào nên dùng Strategy?

Dùng Strategy khi:

- Có nhiều biến thể của cùng một hành vi (sorting, extraction, rendering, payment...)
- Cần thay đổi behavior tại runtime
- Muốn tránh các khối if-else dài phân nhánh theo loại hành động
- Muốn tách biệt logic của từng thuật toán để dễ test riêng

Ví dụ thực tế hay gặp:

- Các phương thức thanh toán (PayPal, Credit Card, Bank Transfer)
- Các thuật toán sắp xếp (QuickSort, MergeSort, BubbleSort)
- Các chế độ nén file (ZIP, RAR, GZIP)
- Các renderer (PDF, HTML, Markdown)
