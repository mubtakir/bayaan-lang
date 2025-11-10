# SVG: basic shapes (gfx)

An example generating an SVG with a rectangle, circle, line and text.

```bayan
include "gfx/svg.bayan"

inner = svg_rect(20, 20, 120, 80, "#fee", "#c33", 2)
inner = inner + svg_circle(220, 80, 40, "#cdf", "#246", 2)
inner = inner + svg_line(20, 150, 360, 150, "#666", 1)
inner = inner + svg_text(30, 180, "Hello SVG", 16, "#133")

svg = svg_wrap(400, 220, inner)
print(svg)
```

