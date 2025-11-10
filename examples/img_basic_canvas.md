# Raster image (Pillow): basic canvas and shapes

```bayan
include "gfx/img.bayan"

img = img_canvas(360, 220, "#ffffff")
img = img_rect(img, 20, 20, 120, 80, "#a0c4ff", "#333", 2)
img = img_circle(img, 210, 100, 40, "#ffd166", "#333", 2)
img = img_line(img, 20, 150, 320, 150, "#06d6a0", 3)
img = img_text(img, 24, 120, "Pillow demo", "#111")

print(img_to_data_uri(img, "PNG"))
```

