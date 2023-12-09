---
layout: post
title:  Tổng quan giao thức AMBA-AHB
date:   2023-11-08 00:51:55 +7
image:  /assets/images/blog/post-blog-4.png
author: chipmastervn
tags:   
- Bus SoC
categories: Blogs
summary: Những điều cần chú ý về giao thức AMBA-AHB trong Vi Mạch Bán Dẫn.
---

### Mục lục

- [1. AMBA AHB là gì?](#amba-ahb-la-gi)
- [2. Typical AMBA AHB-based System](#typical-amba-ahb-based-system)
- [3. Bus Interconnection](#bus-interconnection)
- [4. Tổng quan về các hoạt động của AHB](#tong-quan-ve-cac-hoat-dong-cua-ahb)
- [5. Simple Transfer](#simple-transfer)
- [6. Ví dụ thực tế](#vi-du-thuc-te)
- [7. Tác giả](#tac-gia)
- [8. Tài liệu tham khảo](#tai-lieu-tham-khao)

<a name="amba-ahb-la-gi"></a>

### 1. AMBA AHB là gì?

AMBA (Advanced Microcontroller Bus Architecture) là một kiến trúc bus phổ biến trong việc kết nối các thành phần trong hệ thống điện tử, đặc biệt là trong các hệ thống dựa trên vi xử lý ARM (Advanced RISC Machines). AMBA AHB (Advanced High-performance Bus) là một trong các tiêu chuẩn AMBA, nó là một giao diện bus chất lượng cao được phát triển bởi ARM Limited để kết nối các vi xử lý ARM với các thiết bị ngoại vi và bộ nhớ hệ thống. Dưới đây là một số điểm quan trọng về AMBA AHB bus:

- Được thiết kế cho hiệu suất cao: AMBA AHB được thiết kế để đáp ứng yêu cầu về hiệu suất cao và có khả năng truyền dữ liệu ở tốc độ nhanh, làm cho nó phù hợp cho các ứng dụng đòi hỏi xử lý dữ liệu nhanh và hiệu quả.

- Master-Slave Architecture: AMBA AHB sử dụng mô hình kiến trúc master-slave, trong đó các thành phần chính như vi xử lý ARM, bộ nhớ hệ thống và các thiết bị ngoại vi đều hoạt động như các master hoặc slave trên bus.

- Chế độ truy cập đồng thời: AMBA AHB hỗ trợ truy cập đồng thời, cho phép nhiều master truy cập đồng thời các slave trên bus.

- Bảo mật: AMBA AHB hỗ trợ tính năng bảo mật thông qua các chế độ truy cập khác nhau và quyền ưu tiên, giúp kiểm soát quyền truy cập vào các thiết bị và bộ nhớ.

- Pipelining: Bus AMBA AHB sử dụng pipelining để tối ưu hóa hiệu suất truy cập bộ nhớ và thiết bị, giúp giảm độ trễ trong quá trình truyền dữ liệu.

- Tương thích ngược: Giao diện AMBA AHB được thiết kế để tương thích ngược với các phiên bản cũ hơn của AMBA, giúp giảm đau đầu khi nâng cấp hệ thống.

AMBA AHB đã trở thành một tiêu chuẩn quan trọng trong việc kết nối các thành phần trong các hệ thống dựa trên vi xử lý ARM và đã được sử dụng rộng rãi trong nhiều ứng dụng khác nhau, từ điện thoại di động, máy tính bảng, đến thiết bị nhúng và xe ô tô thông minh.

<a name="typical-amba-ahb-based-system"></a>

### 2. Typical AMBA AHB-based System

Kết nối của các master và các slave với ma trận bus AHB được hiển thị trong Hình 1. Ma trận bus AHB cho phép nhiều master truy cập vào một slave duy nhất thông qua cơ chế phân xử (arbitration mechanism).
![alt text](ahbSystem.PNG "Title")

<a name="bus-interconnection"></a>

### 3. Bus Interconnection

Hai bộ mux dành cho việc ghi dữ liệu và địa chỉ được điều khiển bởi bộ phân xử.
- Tất cả các bus master điều khiển địa chỉ, dữ liệu ghi và các tín hiệu điều khiển
- Bộ phân xử xác định các tín hiệu của master nào được chuyển đến các slave
Một bộ mux được điều khiển bởi central decoder cho việc đọc data
- Tất cả các bus slave điều khiển data đọc và các tín hiệu phản hồi
- Central decoder xác định các tín hiệu của slave nào được chuyển đến các master
![alt text](abitter.PNG "Title")

<a name="tong-quan-ve-cac-hoat-dong-cua-ahb"></a>

### 4. Tổng quan về các hoạt động của AHB

Các master phải được cấp phép để truy cập trước khi truyền dữ liệu
- Các master kích hoạt các tín hiệu yêu cầu
- Bộ phân xử chỉ định khi nào master sẽ được cấp phép sử dụng bus
Một AHB-bus transfer bao gồm
- Address phase
   * Một chu kì, trong đó master lái địa chỉ và các tín hiệu điều khiển
  * Chỉ định hướng, độ rộng truyền dữ liệu và xác định liệu transfer có phải là một phần của chuỗi dữ liệu liên tục hay không.
  *  Mỗi address tương ứng với 1-byte data 
- Data phase
  * Một hoặc nhiều chu kì điều khiển bởi HREADY từ slave
  * Các slave lấy mẫu và xử lý dữ liệu
Address phase và data phase của các transaction khác nhau có thể chồng chéo được

Tín hiệu phản hồi HRESP[1:0]
- OKAY
- ERROR
- RETRY or SPLIT

<a name="simple-transfer"></a>

### 5. Simple Transfer

![alt text](simple1.PNG "Title")
Master lái địa chỉ và các tín hiệu điều khiển

![alt text](simple2.PNG "Title")
Slave lấy mẫu địa chỉ và các tín hiệu điều khiển. Đồng thời, slave bắt đầu truyền phản hồi

![alt text](simple3.PNG "Title")
Master lấy mẫu read data và phản hồi từ slave

![Alt text](image.png)
Waveform của một simple transfer

<a name="vi-du-thuc-te"></a>

### 6. Ví dụ thực tế

Phần này phân tích ví dụ thực tế

Một số lưu ý:
- Tham khảo https://topdev.vn/blog/markdown-la-gi-cach-su-dung-markdown/ để viết markdown cho đúng
- Chèn link

```markdown
-Example 
[Github](https://github.com/usernamecreator1tvtien96)
```

- Chèn ảnh
  - Copy ảnh vào thư mục `/assets/images/blog/`
  - Viết theo cú pháp: `![alt text](simple2.PNG "Title")`

  ![alt text](/assets/images/blog/post-blog-4.png "Title")
  
  ```markdown
  -Example ![alt text](/assets/images/blog/post-blog-4.png "Title")
  ```

```python
def conv2d(A, W, b, stride=1, pad=0):
    """
    A: input, A.shape = (m, in_height, in_width, in_channel)
    W: filters, W.shape = (f, f, in_channel, out_channel)
    b: biases, b.shape = (out_channel)
    """
    assert A.shape[3] == W.shape[2],\
        'number of input channels ({}) in A != number of input channels ({}) in W'.format(
            A.shape[3], W.shape[2]
        )
    m, in_height, in_width, _ = A.shape
    f, _, in_channel, out_channel = W.shape
    A_pad = np.pad(A, ((0, 0), (pad, pad), (pad, pad), (0, 0)), mode='constant', constant_values=0)
    # new shape
    out_height = int((in_height - f + 2*pad)/stride) + 1
    out_width = int((in_width - f + 2*pad)/stride) + 1
    A_res = np.zeros((m, out_height, out_width, out_channel))

    for i in range(m):
        for h in range(out_height):
            for w in range(out_width):
                for c in range(out_channel):
                    h_start = h*stride
                    h_end = h_start + f
                    w_start = w*stride
                    w_end = w_start + f
                    a_slide = A_pad[i, h_start: h_end, w_start:w_end, :]
                    A_res[i, h, w, c] = np.sum(a_slide * W[:, :, :, c]) + b[c]
    return A_res
```

<a name="tac-gia"></a>

### 7. Tác giả
**Anh Trần Tiến**

[Github](https://github.com/usernamecreator1tvtien96)

<a name="tai-lieu-tham-khao"></a>

### 8. Tài liệu tham khảo

Code and documentation copyright 2011-2023 the authors.
