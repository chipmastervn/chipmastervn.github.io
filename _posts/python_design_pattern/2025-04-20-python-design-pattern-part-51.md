---

layout: docs
title: "Bài tập thực hành về observer pattern"
author: chipmaster
date: 2025-04-20
part: 51
---

### Bài tập 1: Weather Station

Xây dựng hệ thống trạm thời tiết sử dụng Observer Pattern.

**WeatherData (Subject)** có các thuộc tính:

- `temperature: float`
- `humidity: float`
- `pressure: float`

Khi dữ liệu thay đổi (gọi `set_measurements()`), tất cả displays cập nhật.

**Các Display observers:**

- `CurrentConditionsDisplay` — hiển thị nhiệt độ và độ ẩm hiện tại
- `StatisticsDisplay` — tính và hiển thị nhiệt độ trung bình, min, max
- `ForecastDisplay` — dự báo dựa trên biến động áp suất

**Gợi ý cấu trúc:**

```python
weather_data = WeatherData()

current = CurrentConditionsDisplay()
stats = StatisticsDisplay()
forecast = ForecastDisplay()

weather_data.attach(current)
weather_data.attach(stats)
weather_data.attach(forecast)

weather_data.set_measurements(25.0, 65.0, 1013.0)
weather_data.set_measurements(27.5, 70.0, 1010.0)
```

### Bài tập 2: Stock Market Monitor

Mô phỏng theo dõi giá cổ phiếu.

**Stock (Subject)** có:

- `symbol: str` — mã cổ phiếu (ví dụ: "AAPL")
- `price: float` — giá hiện tại
- `change: float` — thay đổi so với giá trước

**Các Observer:**

- `PriceDisplay` — in giá hiện tại và thay đổi
- `AlertSystem` — in cảnh báo nếu giá thay đổi hơn 5%

```python
stock = Stock("AAPL", initial_price=150.0)

price_display = PriceDisplay()
alert = AlertSystem(threshold=0.05)

stock.attach(price_display)
stock.attach(alert)

stock.update_price(153.0)
# Pricedisplay: aapl - $153.00 (+$3.00)

stock.update_price(140.0)
# Pricedisplay: aapl - $140.00 (-$13.00)
# Alertsystem: alert! aapl dropped 8.5% (>5% threshold)
```

**Câu hỏi để suy nghĩ**

- Sự khác nhau giữa Push model và Pull model trong hai Bài tập trên là gì?
- Nếu muốn Observer chỉ nhận thông báo khi một thuộc tính cụ thể thay đổi (ví dụ chỉ temperature), cần thay đổi kiến trúc như thế nào?
