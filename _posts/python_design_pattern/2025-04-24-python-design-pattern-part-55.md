---

layout: docs
title: "Bài tập thực hành về state pattern"
author: chipmaster
date: 2025-04-24
part: 55
---


### Bài tập 1: Media Player

Xây dựng một media player sử dụng State Pattern với ba trạng thái:

| State | `play()` | `pause()` | `stop()` |
|-------|----------|-----------|----------|
| **Stopped** | → Playing | (không làm gì) | (không làm gì) |
| **Playing** | (không làm gì) | → Paused | → Stopped |
| **Paused** | → Playing | (không làm gì) | → Stopped |

**Gợi ý:**

```python
class MediaPlayerState(ABC):
    @abstractmethod
    def play(self, player: 'MediaPlayer'): pass

    @abstractmethod
    def pause(self, player: 'MediaPlayer'): pass

    @abstractmethod
    def stop(self, player: 'MediaPlayer'): pass


class StoppedState(MediaPlayerState):
    def play(self, player):
        print("Starting playback...")
        player.set_state(PlayingState())

    def pause(self, player):
        print("Nothing to pause.")

    def stop(self, player):
        print("Already stopped.")
```

**Test case:**

```python
player = MediaPlayer()
player.play()    # Starting playback...
player.pause()   # Pausing...
player.play()    # Resuming...
player.stop()    # Stopping...
player.pause()   # Nothing to pause.
```

### Bài tập 2: Text Editor với lịch sử thay đổi

Xây dựng Text Editor hỗ trợ các chế độ format:

- `DefaultState`
- `BoldState`
- `ItalicState`
- `UnderlineState`

Mỗi ký tự được gõ được wrap với format của state hiện tại:

```
Default: "hello"    → hello
Bold:    "hello"    → **hello**
Italic:  "hello"    → _hello_
```

**Thêm tính năng Undo/Redo:**

Lưu lại lịch sử state để có thể quay lại state trước.

```python
editor = TextEditor()
editor.write("hello")       # hello
editor.set_bold()
editor.write("world")       # **world**
editor.undo()               # Quay lại Default
editor.write("again")       # again
```

**Gợi ý:** Dùng một stack (list) để lưu lịch sử các states.

**Câu hỏi để suy nghĩ**

- State Pattern và Strategy Pattern trông giống nhau về cấu trúc. Điểm khác nhau là gì về intention?
- Trong Bài tập Media Player, `stop()` ở `StoppedState` không làm gì. Có nên raise exception thay vì im lặng không? Khi nào nên dùng cách nào?
