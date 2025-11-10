# SVG: sine wave (gfx/waves)

Plot a sine wave using the waves helper and render to SVG.

```bayan
include "gfx/svg.bayan"
include "gfx/waves.bayan"

points = wave_sine(200, 80, 2, 0)
svg = wave_plot_svg(points, 480, 240, "#e11", 2, 20)
print(svg)
```

