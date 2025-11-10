# Animated GIF: Bouncing Ball (raster)

Generates raster frames with Pillow via gfx/img, then exports a single animated GIF as data URI.

```bayan
include "gfx/img.bayan"
import math

w = 200
h = 160
frames = []

for f in range(20)
{
    t = f/19.0
    y = 30 + 80*abs(math.sin(2*math.pi*t))
    img = img_canvas(w, h, "#ffffff")
    # ground
    img_line(img, 10, h-20, w-10, h-20, "#7f8c8d", 3)
    # ball
    img_circle(img, 50 + f*6, int(y), 12, "#e74c3c", "#c0392b", 2)
    frames.append(img)
}

# one data:image/gif;base64,... line
print(img_gif_from_frames(frames, 80, 0))
```

