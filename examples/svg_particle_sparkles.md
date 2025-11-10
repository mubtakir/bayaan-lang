# Particle Sparkles (SVG multi-frames)

A simple sparkle effect using multiple SVG frames (no JS). Use Preview Play + FPS.

```bayan
include "gfx/svg.bayan"
import math
import random

w = 200
h = 200
cx = 100
cy = 100
random.seed(42)

for f in range(20)
{
    t = f / 19.0
    inner = ""
    for i in range(40)
    {
        ang = (2 * math.pi * i) / 40.0
        r = 10 + 80 * abs(math.sin(ang + 6.283185 * t))
        x = cx + r * math.cos(ang)
        y = cy + r * math.sin(ang)
        c = svg_circle(x, y, 2.5, "#f1c40f", "none", 0)
        inner = inner + c.replace("/>", "" + " fill-opacity='" + str(0.3 + 0.7 * abs(math.sin(ang + 6.283185 * t))) + "'/>")
    }
    print(svg_wrap(w, h, inner))
}
```

