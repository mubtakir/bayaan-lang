# SVG: free drawing with pen (gfx)

Draw a simple heart using pen_move/pen_curve.

```bayan
include "gfx/svg.bayan"

p = pen_new()
pen_move(p, 240, 80)
# Right lobe
pen_curve(p, 300, 20, 380, 60, 240, 200)
# Left lobe
pen_curve(p, 100, 60, 180, 20, 240, 80)
pen_close(p)

inner = pen_to_path(p, "#f9b", "#c33", 2)
svg = svg_wrap(480, 260, inner)
print(svg)
```

