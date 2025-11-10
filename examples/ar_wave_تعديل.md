# تعديل الموجات: AM و FM

```bayan
include "gfx/waves.bayan"

ن = 600
AM = موجة_AM(ن, 60, 5.0, 1.5, 0.8, 0.0)
print(رسم_موجة_SVG(AM, 520, 200, "#1d3557", 2, 12, None, True, False, None, 0.0))

FM = موجة_FM(ن, 60, 5.0, 1.5, 1.2, 0.0)
print(رسم_موجة_SVG(FM, 520, 200, "#e76f51", 2, 12, None, True, False, None, 0.0))
```

