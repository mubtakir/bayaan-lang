# Wave Modulation: AM and FM

```bayan
include "gfx/waves.bayan"

n = 600
am = wave_am(n, 60, 5.0, 1.5, 0.8, 0.0)
print(wave_plot_svg(am, 520, 200, "#1d3557", 2, 12, None, True, False, None, 0.0))

fm = wave_fm(n, 60, 5.0, 1.5, 1.2, 0.0)
print(wave_plot_svg(fm, 520, 200, "#e76f51", 2, 12, None, True, False, None, 0.0))
```

