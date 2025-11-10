# SVG: موجة جيبية (gfx/waves)

توليد موجة جيبية ورسمها إلى SVG.

```bayan
include "gfx/svg.bayan"
include "gfx/waves.bayan"

نقاط = موجة_جيب(200, 80, 2, 0)
صورة = رسم_موجة_SVG(نقاط, 480, 240, "#e11", 2, 20)
print(صورة)
```

