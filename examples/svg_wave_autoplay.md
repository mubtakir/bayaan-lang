# Wave Animation via Multi-frame Auto-play (SVG)

Generates multiple SVG frames of a moving sine wave. Use the IDE Preview Play button to animate.

```bayan
include "gfx/waves.bayan"
import math

w = 400
h = 160

for f in range(24)
{
    phase = 2 * math.pi * (f / 24.0)
    pts = wave_sine(200, 60, 1.0, phase)
    svg = wave_plot_svg(pts, w, h, "#16a085", 2, 10, None, True, False, None, 0.25)
    print(svg)
}
```

