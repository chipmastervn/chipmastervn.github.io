---
layout: post
title:  "Segmentation trong Operating System (Phần 1)"
author: chipmaster
categories: [Memory Management]
image: assets/images/001_post.png
tags: []
---

Để có thể sử dụng một vùng không gian địa chỉ lớn (large address space) khi có nhiều vùng không gian trống (free address space) giữa các khu vực bộ nhớ như heap và stack, các hệ điều hành (OS) có thể sử dụng các kỹ thuật quản lý bộ nhớ (memory management) như: Segmentation, Paging, Swapping, Virtual Memory.

Ở bài viết này, chúng ta cùng tìm hiểu về kĩ thuật **Segmentation** trong Operating System.

<div class="sidebar-menu">
    <h6>Trong bài viết này</h6>
    <a href="#1base-và-bound-registers">1. Base & Bounds Registers</a>
    <a href="#2segmentation">2. Segmentation</a>
    <a href="#3segmentation-fault">3. Segmentation Fault</a>
    <a href="#4explicit-approach">4. Explicit Approach</a>
    <a href="#5implicit-approach">5. Implicit Approach</a>
</div>

<div class="mobile-menu">
    <h3>Trong bài viết này</h3>
    <ul><a href="#1base-và-bound-registers">1. Base & Bounds Registers</a></ul>
    <ul><a href="#2segmentation">2. Segmentation</a></ul>
    <ul><a href="#3segmentation-fault">3. Segmentation Fault</a></ul>
    <ul><a href="#4explicit-approach">4. Explicit Approach</a></ul>
    <ul><a href="#5implicit-approach">5. Implicit Approach</a></ul>
</div>

#### 1.Base và Bound Registers

Trong hệ điều hành (OS), Memory Management Unit (MMU) là một khối quan trọng chịu trách nhiệm quản lý bộ nhớ cho các tiến trình (process). MMU sử dụng hai thanh ghi chính: Base Register và Bound Register để quản lý không gian bộ nhớ của từng tiến trình trong bộ nhớ vật lý (physical memory).

Chức năng của 2 thanh ghi này như sau:

- **Base Register** (Thanh ghi cơ sở): lưu địa chỉ _bắt đầu_ của vùng bộ nhớ được cấp phát cho tiến trình. Tất cả địa chỉ mà tiến trình truy cập sẽ được cộng thêm với địa chỉ cơ sở này. Khi tiến trình truy cập một địa chỉ, địa chỉ này sẽ được cộng với giá trị trong Base Register, giúp chuyển đổi địa chỉ ảo sang địa chỉ vật lý một cách nhanh chóng.

- **Bound Register** (Thanh ghi giới hạn): lưu _kích thước_ của vùng bộ nhớ cấp phát cho tiến trình. Khi truy cập một địa chỉ, OS sẽ kiểm tra địa chỉ này để đảm bảo chương trình chỉ truy cập dữ liệu trong phạm vi giới hạn được cấp phát, xác định bởi Bound Register. Nếu vượt quá, OS sẽ báo lỗi **_Segmentation Fault_**.

Khi sử dụng cặp thanh ghi này, MMU chỉ cần 2 thao tác cơ bản là **thêm** và **so sánh**. 
- Thêm: Thêm địa chỉ ảo với Base Register để có được địa chỉ vật lý.
- So sánh: Kiểm tra để đảm bảo địa chỉ này không vượt quá giới hạn của Bound Register.

Hai thao tác này có thể thực hiện song song, giúp quá trình rất nhanh và tiết kiệm tài nguyên, vì chỉ cần dùng hai thanh ghi.

> Công thức tính địa chỉ vật lý: **Physical address = Virtual address + Base Register**.

> Địa chỉ này phải nằm trong khoảng từ **(Base Register, Base + Bound Register)**.

Tuy nhiên, khi cần cấp phát một vùng bộ nhớ lớn cho một tiến trình, việc chỉ sử dụng Base và Bound Register sẽ không hiệu quả vì có thể không tìm được vùng bộ nhớ liền kề đủ lớn trong bộ nhớ vật lý. Kỹ thuật **Segmentation** được phát triển để giải quyết vấn đề này. Với Segmentation, không gian bộ nhớ của tiến trình được chia thành các đoạn (segment) riêng biệt, giúp tận dụng bộ nhớ hiệu quả hơn và giảm thiểu vấn đề phân mảnh bộ nhớ.

#### 2.Segmentation

Segmentation (phân đoạn) là một kỹ thuật được phát triển để giải quyết vấn đề phân mảnh bộ nhớ. Phân mảnh bộ nhớ xảy ra khi một tiến trình được cấp phát một vùng nhớ lớn hơn mức cần thiết, dẫn đến lãng phí tài nguyên.

Với kỹ thuật Segmentation, bộ nhớ được chia thành nhiều segment (đoạn) có kích thước khác nhau, và mỗi segment là một dải địa chỉ liên tục trong không gian địa chỉ của process. Mỗi segment này có một cặp Base Register (thanh ghi cơ sở) và Bound Register (thanh ghi giới hạn) riêng biệt, thay vì sử dụng một cặp cho toàn bộ bộ nhớ. Điều này giúp OS quản lý bộ nhớ linh hoạt hơn.

Trong không gian địa chỉ của một tiến trình thường có 3 loại segment chính:
- Code Segment: Chứa mã lệnh của chương trình.
- Heap Segment: Chứa dữ liệu mà chương trình cấp phát động trong quá trình chạy.
- Stack Segment: Chứa dữ liệu tạm thời và thông tin gọi hàm.

Kỹ thuật Segmentation cho phép OS đặt từng segment của một chương trình vào các vị trí khác nhau trong bộ nhớ vật lý, giúp sử dụng bộ nhớ hiệu quả hơn và tránh lãng phí khi bộ nhớ vật lý bị lấp đầy bởi các khoảng địa chỉ ảo không sử dụng.

Giả sử chúng ta muốn đưa không gian địa chỉ của một chương trình vào bộ nhớ vật lý. Khi mỗi đoạn có một cặp Base Register (thanh ghi cơ sở) và Bound Register (thanh ghi giới hạn) riêng, OS có thể đưa từng đoạn vào các vị trí độc lập trong bộ nhớ vật lý. Ví dụ trong hình minh họa, một bộ nhớ vật lý 64KB chứa ba đoạn:

- Code segment được đặt tại địa chỉ `32KB` trong bộ nhớ vật lý, với kích thước `2KB`.
- Heap segment được đặt tại địa chỉ `34KB`, với kích thước `3KB`.
- Stack segment được đặt tại địa chỉ `28KB`, với kích thước `2KB`.

Kỹ thuật này cho phép OS sử dụng không gian địa chỉ lớn, bao gồm cả các vùng địa chỉ ảo thưa thớt (sparse address space), vì chỉ những vùng bộ nhớ đang dùng mới được cấp phát trong bộ nhớ vật lý.

Để hỗ trợ Segmentation, phần cứng của MMU cần một bộ ba cặp thanh ghi (base và bounds) để quản lý ba segment chính.

#### 3.Segmentation Fault

Segmentation Fault (lỗi phân đoạn) là một lỗi xảy ra khi một chương trình cố gắng truy cập vào một vùng bộ nhớ không được phép hoặc không hợp lệ. Lỗi này thường xuất hiện khi:

- Truy cập bộ nhớ không hợp lệ: Chương trình cố gắng truy cập một địa chỉ bộ nhớ ngoài phạm vi được cấp phát, chẳng hạn như vượt quá giới hạn của một mảng hoặc truy cập vào một con trỏ rỗng (null pointer).

- Truy cập vào vùng bộ nhớ chỉ đọc: Khi chương trình cố gắng ghi dữ liệu vào vùng bộ nhớ chỉ có quyền đọc, chẳng hạn như vùng chứa hằng số (như các chuỗi ký tự cố định).

- Sử dụng con trỏ chưa khởi tạo: Con trỏ chưa được khởi tạo có thể trỏ đến một địa chỉ ngẫu nhiên trong bộ nhớ, dẫn đến việc truy cập vào vùng không hợp lệ.

- Giải phóng bộ nhớ không hợp lệ: Khi một chương trình cố gắng giải phóng một vùng bộ nhớ mà nó chưa từng cấp phát hoặc đã giải phóng trước đó, điều này cũng có thể gây ra lỗi phân đoạn.

Để hiểu rõ hơn, hãy cùng xem một ví dụ về cách hệ điều hành chuyển đổi địa chỉ ảo (virtual address) sang địa chỉ vật lý (physical address) bằng kỹ thuật Segmentation.

**Ví dụ 1**: Truy cập hợp lệ vào Code Segment

Giả sử chương trình có một địa chỉ ảo là `100` trong **Code Segment**. Khi chương trình yêu cầu truy cập địa chỉ này, phần cứng sẽ thêm giá trị base của Code Segment vào địa chỉ ảo 100 để tìm địa chỉ vật lý tương ứng:
- Base của Code Segment = `32KB` (32*1024).
- Địa chỉ vật lý = `100` + `32KB` = `32868` (100 + 32*1024).

Sau đó, phần cứng sẽ kiểm tra xem địa chỉ này có nằm trong giới hạn kích thước của Code Segment không (giới hạn là `2KB`). Vì `100 < 2KB`, địa chỉ hợp lệ, và phần cứng sẽ truy cập bộ nhớ vật lý tại địa chỉ `32868`.

**Ví dụ 2**: Truy cập hợp lệ vào Heap Segment

Giả sử chương trình muốn truy cập vào địa chỉ ảo `4200` trong **Heap Segment**. Đầu tiên, chúng ta phải chuyển đổi địa chỉ ảo này thành offset trong Heap Segment:

- Địa chỉ bắt đầu của Heap Segment trong không gian địa chỉ ảo là `4KB` (4096). Do đó, offset sẽ là `4200 - 4096 = 104`.

Sau đó, phần cứng sẽ thêm Base của Heap Segment trong bộ nhớ vật lý (ở đây là `34KB`) vào offset:
- Địa chỉ vật lý = `34KB + 104 = 34920`.

**Ví dụ 3**: Truy cập không hợp lệ (Segmentation Fault)

Nếu chương trình cố gắng truy cập một địa chỉ vượt quá phạm vi hợp lệ của Heap Segment, chẳng hạn như `7KB` trong không gian địa chỉ ảo, phần cứng sẽ phát hiện rằng địa chỉ này vượt quá giới hạn của Heap Segment và từ chối truy cập. Lúc này, hệ điều hành sẽ phát sinh lỗi **Segmentation Fault** và thường sẽ chấm dứt tiến trình vì vi phạm truy cập bộ nhớ.

#### 4.Explicit Approach

Trong quá trình chuyển đổi từ địa chỉ ảo sang địa chỉ vật lý, phần cứng sử dụng các *segment registers* (thanh ghi phân đoạn). Vậy làm thế nào để phần cứng xác định được offset trong một đoạn và biết địa chỉ đó thuộc về đoạn nào?
Một cách làm phổ biến được gọi là *explicit approach* (phương pháp tường minh).
- Ở phương pháp này, không gian địa chỉ được chia thành các đoạn dựa trên một số bit đầu tiên của địa chỉ ảo.
- Những bit này giúp xác định đoạn mà địa chỉ thuộc về, ví dụ như Code Segment, Heap Segment, hay Stack Segment.
- Sau khi xác định được đoạn, các bit còn lại trong địa chỉ sẽ cho biết vị trí chi tiết (offset) của địa chỉ trong đoạn đó.

Nói đơn giản, các bit đầu tiên của địa chỉ ảo cho biết địa chỉ thuộc đoạn nào, còn các bit còn lại cho biết vị trí cụ thể bên trong đoạn đó.

Trong ví dụ này, không gian địa chỉ ảo của chúng ta được chia thành ba segments. Để phân biệt các đoạn, chúng ta chỉ cần dùng 2 bit đầu tiên của địa chỉ ảo. 
Giả sử địa chỉ ảo có **14 bit**. **2 bit đầu tiên** của địa chỉ này xác định đoạn mà địa chỉ thuộc về, và **12 bit còn lại** chỉ ra **offset** trong đoạn đó.
- Nếu 2 bit đầu tiên là 00, phần cứng hiểu rằng địa chỉ này thuộc Code Segment. Nó sẽ sử dụng cặp thanh ghi base và bounds của Code Segment để xác định địa chỉ vật lý tương ứng.
- Nếu 2 bit đầu tiên là 01, địa chỉ thuộc Heap Segment và phần cứng sẽ dùng cặp thanh ghi base và bounds của Heap Segment.

Các giá trị khác của 2 bit đầu tiên có thể được dùng cho các đoạn khác (như Stack Segment) hoặc để mở rộng thêm các phân đoạn trong hệ thống.

Bằng cách này, hệ thống có thể nhanh chóng xác định đoạn mà địa chỉ thuộc về và sử dụng thanh ghi tương ứng để tính địa chỉ vật lý trong bộ nhớ.

Để hiểu rõ hơn, hãy cùng dịch địa chỉ ảo `4200` trong **Heap Segment** sang dạng nhị phân và xem cách phần cứng xử lý địa chỉ này.

Địa chỉ ảo `4200` trong hệ nhị phân trông như sau:
- 2 bit đầu tiên: **01** - cho biết địa chỉ này thuộc Heap Segment.
- 12 bit cuối: `000001101000` (hex: `0x068`, decimal: `104`) - đây là offset trong Heap Segment, tức là vị trí chi tiết trong đoạn này. (Giá trị 104 được giải thích ở ví dụ trước)

Xác định địa chỉ vật lý
- 2 bit đầu tiên **01** cho phép phần cứng biết địa chỉ thuộc Heap Segment. Phần cứng sẽ chọn thanh ghi base của Heap Segment để thực hiện tính toán.
- 12 bit còn lại là offset (**104**) trong đoạn, sẽ được thêm vào giá trị của base register của Heap Segment để tính địa chỉ vật lý cuối cùng.

Địa chỉ vật lý = Base của Heap Segment + Offset (104).

Offset này cũng giúp phần cứng kiểm tra bounds (giới hạn) của đoạn. Nếu offset không nhỏ hơn bounds (kích thước tối đa của đoạn), địa chỉ này là không hợp lệ và sẽ gây ra lỗi (như lỗi segmentation fault).

Minh họa bằng code C như sau:

```C
#define SEG_MASK 0x300
#define SEG_SHIFT 12
#define OFFSET_MASK 0xFFF

// get top 2 bits of 14-bit VA
Segment = (VirtualAddress & SEG_MASK) >> SEG_SHIFT
// now get offset
Offset  = VirtualAddress & OFFSET_MASK
if (Offset >= Bounds[Segment])
    RaiseException(PROTECTION_FAULT)
else
    PhysAddr = Base[Segment] + Offset
    Register = AccessMemory(PhysAddr)
```

#### 5.Implicit Approach

Trong hệ thống phân đoạn, khi ta sử dụng 2 bit đầu của địa chỉ để xác định đoạn (segment) mà địa chỉ thuộc về, nhưng chỉ có 3 đoạn chính (code, heap và stack), một phần của không gian địa chỉ sẽ bị bỏ trống. Một số hệ thống khắc phục điều này bằng cách gộp code vào cùng một đoạn với heap để tận dụng tối đa không gian địa chỉ ảo và chỉ cần sử dụng 1 bit để chọn đoạn.

Khi sử dụng nhiều bit để chọn đoạn, có một số hạn chế:
- Giới hạn kích thước đoạn: Sử dụng 2 bit để chọn đoạn sẽ chia không gian địa chỉ thành 4 phần. Với một địa chỉ ảo `16KB`, không gian này sẽ được chia thành 4 đoạn, mỗi đoạn tối đa `4KB`. Điều này có nghĩa là mỗi đoạn (code, heap, stack) không thể vượt quá `4KB`.
- Khó mở rộng: Nếu chương trình muốn mở rộng một đoạn, ví dụ như heap hay stack, vượt quá giới hạn `4KB`, thì không thể làm được vì không gian địa chỉ đã bị chia sẵn và không thể tăng thêm.

Có một phương pháp khác giúp xác định đoạn mà không cần dùng bit riêng để chỉ định, giúp tận dụng tốt hơn không gian địa chỉ, gọi là **implicit approach**.
Thay vì dùng các bit để chọn đoạn, hệ thống có thể tự động xác định đoạn dựa trên nguồn gốc của địa chỉ (implicit approach):
- Nếu địa chỉ được lấy từ program counter (đếm lệnh), địa chỉ này thuộc Code Segment (vì program counter chứa địa chỉ lệnh tiếp theo cần thực thi).
- Nếu địa chỉ đến từ stack pointer hoặc base pointer, địa chỉ này thuộc Stack Segment.
- Các địa chỉ khác được coi là thuộc Heap Segment.