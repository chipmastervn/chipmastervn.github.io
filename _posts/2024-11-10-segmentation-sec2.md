---
layout: post
title:  "Segmentation trong Operating System (Phần 2)"
author: chipmaster
categories: [Memory Management]
image: assets/images/001_post.png
tags: []
---

Ở [bài viết trước](/segmentation-sec1), chúng ta đã cùng nhau tìm hiểu về **Base & Bound Registers**, **Segmentation**, **Segmentation Fault**, **Explicit Approach**, **Implicit Approach**.

Trong bài này, chúng ta sẽ được biết về **Stack** trong Operating System và cùng nhìn lại kĩ thuật Segmentation.

<div class="sidebar-menu">
    <h6>Trong bài viết này</h6>
    <a href="#1stack-trong-operating-system">1. Stack trong Operating System</a>
    <a href="#2ưu-điểm-của-kĩ-thuật-segmentation">2. Ưu điểm của kĩ thuật Segmentation</a>
    <a href="#3thách-thức-của-kĩ-thuật-segmentation">3. Thách thức của kĩ thuật Segmentation</a>
</div>

<div class="mobile-menu">
    <h3>Trong bài viết này</h3>
    <ul><a href="#1stack-trong-operating-system">1. Stack trong Operating System</a></ul>
    <ul><a href="#2ưu-điểm-của-kĩ-thuật-segmentation">2. Ưu điểm của kĩ thuật Segmentation</a></ul>
    <ul><a href="#3thách-thức-của-kĩ-thuật-segmentation">3. Thách thức của kĩ thuật Segmentation</a></ul>
</div>

#### 1.Stack trong Operating System

Khi Stack được di chuyển đến một địa chỉ vật lý cụ thể trong bộ nhớ, ở đây là `28KB`, Stack sẽ hoạt động theo một cách đặc biệt. Nó không tăng dần từ địa chỉ thấp lên địa chỉ cao như mảng thông thường, mà **giảm dần** từ địa chỉ cao về địa chỉ thấp.

Stack bắt đầu ở địa chỉ `28KB` và có thể mở rộng (lớn dần lên) về phía dưới đến địa chỉ `26KB` trong bộ nhớ vật lý. Phần này tương ứng với địa chỉ ảo từ `16KB` đến `14KB`. Điều này có nghĩa là Stack chiếm một vùng nhớ từ `28KB` đến `26KB` trong địa chỉ vật lý, nhưng ở mức địa chỉ ảo, nó là từ `16KB` đến `14KB`.

Do Stack có hướng phát triển ngược (hướng về phía địa chỉ thấp hơn), quá trình chuyển đổi từ địa chỉ ảo sang địa chỉ vật lý cần phải có cách tiếp cận khác để phù hợp với điều này.

Ngoài việc biết địa chỉ cơ sở (nơi Stack bắt đầu) và kích thước tối đa của Stack, **phần cứng** cũng cần biết hướng mà Stack phát triển. Ví dụ: phần cứng có thể sử dụng một "**bit**" để chỉ ra hướng phát triển: nếu bit là 1 thì Stack phát triển về hướng tăng địa chỉ (như mảng thông thường), còn nếu bit là 0 thì Stack phát triển về hướng giảm địa chỉ.
Hãy xem bảng dưới đây:

| **Segment** | **Địa chỉ bắt đầu** | **Kích thước (Max 4K)** | **Tăng địa chỉ** |
|:-----------:|:-------------------:|:--------------:|:----------------:|
|     Code    |         32K         |       2K       |         1        |
|     Heap    |         34K         |       3K       |         1        |
|    Stack    |         28K         |       2K       |         0        |

Vì Stack phát triển ngược, việc dịch địa chỉ ảo sang địa chỉ vật lý cũng cần thay đổi. Thay vì sử dụng quy tắc dịch cho các đoạn (segment) phát triển theo chiều tăng, phần cứng cần dịch địa chỉ cho Stack theo chiều ngược.

Giả sử bạn muốn truy cập vào một địa chỉ ảo cụ thể, là `15KB`. Theo ví dụ, địa chỉ ảo này sẽ tương ứng với `27KB` trong bộ nhớ vật lý. Để xử lý địa chỉ này, địa chỉ ảo (`15KB`) sẽ được chuyển thành dạng nhị phân. Điều này giúp phần cứng dễ dàng thực hiện các phép toán cần thiết để dịch địa chỉ chính xác.

**15KB = 15 * 1024 = 15360 (decimal) = 11 1100 0000 0000 (binary) = 0x3C00 (hex)**

Hai bit đầu tiên của địa chỉ ảo là `11`. Phần cứng sử dụng hai bit này để xác định đoạn bộ nhớ cần truy cập (ở đây là Stack).
Sau khi xác định đoạn, ta còn lại phần offset là `3KB`, là khoảng cách từ đầu đoạn đến địa chỉ cụ thể cần truy cập.
Do Stack phát triển ngược (hướng về địa chỉ thấp hơn), offset này cần được xử lý như một **offset âm**.

Để tính offset âm, ta lấy kích thước tối đa của đoạn (trong trường hợp này là `4KB`) và trừ đi offset hiện tại (`3KB`):
**3KB − 4KB = −1KB**

Sau đó, để tìm địa chỉ vật lý chính xác, ta sẽ lấy địa chỉ cơ sở (base) của đoạn Stack trong bộ nhớ vật lý, ở đây là `28KB`, và cộng với offset âm `-1KB`: **28KB + (−1KB) = 27KB**

Cuối cùng, để đảm bảo địa chỉ truy cập nằm trong giới hạn cho phép, phần cứng thực hiện kiểm tra độ dài của offset âm bằng cách xem giá trị tuyệt đối của offset âm (`-1KB`) có nhỏ hơn hoặc bằng kích thước hiện tại của đoạn không. Ở đây, kích thước hiện tại của đoạn là `2KB`, và giá trị tuyệt đối của `-1KB` là `1KB`, nhỏ hơn `2KB`. Vì vậy, địa chỉ này là hợp lệ và phần cứng cho phép truy cập.

#### 2.Ưu điểm của kĩ thuật Segmentation

Khi hệ thống sử dụng segmentation, chỉ những phần của không gian địa chỉ (address space) đang thực sự được sử dụng mới được chuyển vào bộ nhớ vật lý. Điều này giúp tiết kiệm không gian so với việc cấp phát một khối bộ nhớ lớn cố định cho cả không gian địa chỉ của tiến trình.
Đặc biệt, khoảng trống giữa Stack và vùng Heap không cần phải cấp phát trong bộ nhớ vật lý, vì vậy hệ điều hành có thể hỗ trợ không gian địa chỉ ảo lớn hơn mà không lãng phí bộ nhớ vật lý.

Nhờ vào việc không phải lưu trữ mọi phần của không gian địa chỉ trong bộ nhớ vật lý, segmentation cho phép hệ điều hành hỗ trợ **không gian địa chỉ ảo lớn hơn** cho mỗi tiến trình. Điều này rất quan trọng cho các ứng dụng cần nhiều bộ nhớ mà không làm quá tải bộ nhớ vật lý.

Do tính toán các phân đoạn đơn giản và thân thiện với phần cứng, segmentation có thể thực hiện nhanh chóng. Phần cứng chỉ cần các phép tính đơn giản để chuyển đổi địa chỉ, nên không tốn nhiều tài nguyên.

#### 3.Thách thức của kĩ thuật Segmentation

Mặc dù segmentation mang lại lợi ích, nó cũng đặt ra những thách thức mới cho hệ điều hành.

**Context Switch**

Khi hệ điều hành chuyển từ một tiến trình (process) này sang một tiến trình khác, nó phải lưu và khôi phục các thanh ghi segment (segment registers) của mỗi tiến trình. Những thanh ghi này chứa thông tin về các đoạn bộ nhớ của tiến trình và rất quan trọng để xác định không gian địa chỉ ảo của nó.
Hệ điều hành phải đảm bảo rằng không gian địa chỉ ảo của mỗi tiến trình được thiết lập chính xác trước khi tiến trình tiếp tục chạy.

**Quản lý sự thay đổi kích thước của các đoạn**

Trong quá trình hoạt động, các đoạn bộ nhớ như Stack hoặc Heap có thể mở rộng hoặc thu nhỏ tùy theo nhu cầu.
Ví dụ, khi chương trình cần cấp phát thêm bộ nhớ động (dùng hàm `malloc()`), nếu Heap hiện tại có đủ chỗ, `malloc()` sẽ cấp phát từ vùng trống trong Heap. Nhưng nếu không đủ, hệ điều hành cần mở rộng đoạn Heap.

Khi đó, thư viện quản lý bộ nhớ (như `malloc()`) sẽ gọi **system call** (ví dụ, `sbrk()`) để yêu cầu mở rộng Heap. Hệ điều hành sẽ cấp thêm không gian bộ nhớ vật lý nếu có, cập nhật thanh ghi kích thước của segment và báo cho thư viện biết yêu cầu đã thành công. Nếu không có đủ bộ nhớ vật lý, hoặc tiến trình đã sử dụng quá nhiều, hệ điều hành có thể từ chối yêu cầu.

**Quản lý vùng nhớ vật lý trống**

Đây là một trong những thách thức quan trọng nhất. Khi mỗi tiến trình có nhiều đoạn với kích thước khác nhau, hệ điều hành phải quản lý chặt chẽ bộ nhớ vật lý để đảm bảo có đủ không gian cho các không gian địa chỉ mới.

Khi có nhiều đoạn được cấp phát và giải phóng, bộ nhớ trống sẽ bị chia nhỏ thành các mảnh có kích thước lẻ, không đều nhau. Điều này làm cho việc cấp phát bộ nhớ mới trở nên khó khăn, vì các đoạn mới có thể không phù hợp với kích thước của những mảnh trống này.

> **Segmentation** không hoàn toàn phù hợp với mô hình không gian địa chỉ thưa thớt hiện đại, nơi mà nhiều phần lớn của không gian địa chỉ có thể chỉ chứa một số ít dữ liệu. 
Để quản lý tốt hơn các không gian địa chỉ thưa thớt và linh hoạt hơn trong quản lý bộ nhớ, hệ điều hành cần những giải pháp mới, chẳng hạn như [**Paging**](/paging) (phân trang).