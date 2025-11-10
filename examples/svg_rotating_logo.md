# Rotating Logo (SVG + SMIL)

A minimal rotating logo using pure SVG animation (no JS runner). Works in the Web IDE preview. العربية بالأسفل.

```bayan
include "gfx/svg.bayan"

w = 200
h = 200
cx = 100
cy = 100

ring = svg_circle(cx, cy, 70, "none", "#2980b9", 8)
dot  = svg_circle(cx + 40, cy, 10, "#e74c3c", "none", 0)
logo = ring + dot

g = svg_rotating_group(logo, cx, cy, 0, 360, "4s", "indefinite")
print(svg_wrap(w, h, g))
```

## العربية

شعار بسيط يدور باستخدام SMIL داخل SVG مباشرة. يعمل في معاينة IDE دون أي تشغيل خارجي.

