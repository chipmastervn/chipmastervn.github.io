---
layout: post
title:  "Phân mảnh bộ nhớ trong Operating System"
author: chipmaster
categories: [Memory Management]
image: assets/images/001_post.png
tags: []
---

Một vấn đề không mong muốn với hệ điều hành là phân mảnh (**fragmentation**). Đây là hiện tượng mà bộ nhớ máy tính bị sử dụng một cách không hiệu quả, làm giảm dung lượng khả dụng và hiệu suất. Hậu quả của phân mảnh cụ thể sẽ phụ thuộc vào hệ thống phân bổ bộ nhớ đang được sử dụng và kiểu phân mảnh xảy ra. 

<div class="sidebar-menu">
    <h6>Trong bài viết này</h6>
    <a href="#1giới-thiệu">1. Giới thiệu</a>
    <a href="#2phân-mảnh-trong-internal-fragmentation">2. Phân mảnh trong (internal fragmentation)</a>
    <a href="#3phân-mảnh-ngoài-external-fragmentation">3. Phân mảnh ngoài (external fragmentation)</a>
</div>

<div class="mobile-menu">
    <h3>Trong bài viết này</h3>
    <ul><a href="#1giới-thiệu">1. Giới thiệu</a></ul>
    <ul><a href="#2phân-mảnh-trong-internal-fragmentation">2. Phân mảnh trong (internal fragmentation)</a></ul>
    <ul><a href="#3phân-mảnh-ngoài-external-fragmentation">3. Phân mảnh ngoài (external fragmentation)</a></ul>
</div>

#### 1.Giới thiệu

Cụ thể, khi xảy ra phân mảnh, các khoảng trống trong bộ nhớ (**free memory**) trở nên không sử dụng được, mặc dù tổng bộ nhớ trống có thể vẫn còn nhiều. Điều này dẫn đến lãng phí bộ nhớ.

Phân mảnh cũng làm giảm hiệu suất hệ thống. Khi dữ liệu bị phân tán, quá trình truy cập và xử lý dữ liệu sẽ mất nhiều thời gian hơn, ảnh hưởng đến tốc độ và hiệu quả của chương trình.

Tùy thuộc vào hệ thống và kiểu phân mảnh: Các loại phân mảnh, như phân mảnh trong và phân mảnh ngoài, và hệ thống lưu trữ (như bộ nhớ RAM hoặc ổ đĩa cứng) sẽ có những hậu quả khác nhau.

#### 2.Phân mảnh trong (internal fragmentation)

Internal fragmentation xảy ra khi bộ nhớ bị lãng phí bên trong các vùng bộ nhớ đã được cấp phát. Đây là một vấn đề thường gặp trong các hệ thống cấp phát bộ nhớ có **kích thước cố định**.

Hệ điều hành cấp phát một khối bộ nhớ có kích thước cố định lớn hơn nhu cầu thực tế của chương trình. Do kích thước khối bộ nhớ này không thể thay đổi, phần bộ nhớ dư thừa (khoảng trống bên trong khối đã cấp phát) không thể sử dụng được, gây lãng phí.

Ví dụ:
- Giả sử một chương trình cần `22KB`, nhưng hệ điều hành chỉ có các khối bộ nhớ kích thước cố định là `32KB`.
Khi hệ điều hành cấp phát một khối `32KB` cho chương trình, sẽ có `10KB` (32KB - 22KB) bị bỏ trống, không thể sử dụng, tạo ra internal fragmentation.

Internal fragmentation thường xảy ra khi:
- Bộ nhớ được chia thành các khối có kích thước cố định (trong hệ thống dùng kĩ thuật paging).
- Kích thước của mỗi khối không phù hợp với nhu cầu thực tế, khiến một phần bộ nhớ bên trong khối bị lãng phí.

Để giảm thiểu internal fragmentation, có một số cách sau:
- Sử dụng phân đoạn (segmentation): Trong segmentation, kích thước của các đoạn được tùy chỉnh dựa trên nhu cầu, giúp giảm thiểu phân mảnh trong vì không gian được cấp phát phù hợp với yêu cầu.
- Sử dụng kích thước khối nhỏ hơn: Chia bộ nhớ thành các khối nhỏ hơn có thể giảm bớt không gian bị lãng phí.
- Dynamic memory allocation: Một số kỹ thuật như cấp phát bộ nhớ động (dynamic memory allocation) giúp cấp phát bộ nhớ phù hợp với nhu cầu của từng yêu cầu.

#### 3.Phân mảnh ngoài (external fragmentation)

External fragmentation xảy ra khi bộ nhớ bị chia thành nhiều khoảng trống nhỏ, rải rác giữa các khối bộ nhớ đã được cấp phát, khiến việc cấp phát thêm **bộ nhớ lớn** trở nên khó khăn. Mặc dù tổng dung lượng bộ nhớ trống có thể đủ, nhưng vì các khoảng trống không liền kề nhau, hệ thống không thể đáp ứng các yêu cầu cấp phát lớn hơn kích thước của từng khoảng trống.

External fragmentation thường xuất hiện trong các hệ thống cấp phát bộ nhớ có **kích thước thay đổi**, như trong **segmentation** hoặc **dynamic memory allocation**. Khi các khối bộ nhớ được cấp phát và giải phóng liên tục với kích thước thay đổi, những khoảng trống rời rạc sẽ dần hình thành giữa các khối bộ nhớ đã cấp phát, tạo ra phân mảnh ngoài.

Ví dụ:
- Giả sử một hệ thống có `60MB` bộ nhớ trống được chia thành ba khoảng `10MB`, `30MB` và `20MB`, nằm rải rác ở các vị trí khác nhau.
Nếu một yêu cầu bộ nhớ cần `40MB`, hệ thống sẽ không thể đáp ứng được mặc dù tổng bộ nhớ trống là 100 MB. Các khoảng trống này không đủ lớn và không liền kề nhau để đáp ứng yêu cầu, dẫn đến phân mảnh ngoài.

Một số kỹ thuật có thể giảm thiểu external fragmentation, bao gồm:
- Kỹ thuật nén bộ nhớ (memory compaction): Dịch chuyển các khối bộ nhớ để làm cho các khoảng trống nằm liền kề nhau, tạo thành một khoảng trống lớn có thể sử dụng.
- Sử dụng phân trang (paging): Trong paging, bộ nhớ được chia thành các khung trang (page frames) có kích thước cố định, và mỗi trang có thể được lưu ở bất kỳ khung nào trong bộ nhớ vật lý. Vì các trang và khung trang có kích thước cố định, external fragmentation được giảm thiểu.
- Sử dụng bộ nhớ ảo (virtual memory): Bộ nhớ ảo cho phép các chương trình sử dụng một không gian địa chỉ liên tục trong bộ nhớ ảo, giúp giảm bớt yêu cầu về bộ nhớ vật lý liên tục.
