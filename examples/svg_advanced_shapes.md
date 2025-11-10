# SVG Advanced Shapes (triangle, ellipse, cylinder, sphere)

```bayan
include "gfx/svg.bayan"

w = 520
h = 300
inner = ""

inner = inner + svg_triangle(40, 220, 140, 220, 90, 120, "#ffd166", "#111", 2)
inner = inner + svg_ellipse(230, 170, 60, 35, "#06d6a0", "#111", 2)
inner = inner + svg_cylinder(320, 80, 80, 140, "#a0c4ff", "#8ecae6", "#111", 2)
inner = inner + svg_sphere(440, 160, 50, "#e5989b", "#111", 2)

inner = inner + svg_text(20, 30, "Advanced shapes: triangle, ellipse, cylinder, sphere", 12, "#333")
print(svg_wrap(w, h, inner))
```

