# Motion Path (SMIL animateMotion)

A circle moves along a Bezier path using SVG SMIL animation. Works directly in Preview.

```bayan
include "gfx/svg.bayan"

w = 220
h = 200

# Visualize the path
path_d = "M 20,100 C 80,20 140,180 200,100"
path = "<path d='" + path_d + "' stroke='#7f8c8d' stroke-width='2' fill='none'/>"

# A follower circle with animateMotion
follower = "<circle cx='0' cy='0' r='8' fill='#e67e22'>" + \
           svg_animate_motion(path_d, "4s", "indefinite", "auto") + \
           "</circle>"

inner = path + follower
print(svg_wrap(w, h, inner))
```

