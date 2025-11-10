# Rotating 3D Cube to SVG (multi-frame)

A minimal 3D wireframe cube projected to 2D and emitted as multiple SVG frames. Use Preview Play.

```bayan
include "gfx/svg.bayan"
import math

w = 320
h = 240
cx = w/2
cy = h/2
fov = 200.0  # perspective factor
size = 60.0

# cube vertices (-1..1), scaled by size
verts = [
    (-1, -1, -1), ( 1, -1, -1), ( 1,  1, -1), (-1,  1, -1),
    (-1, -1,  1), ( 1, -1,  1), ( 1,  1,  1), (-1,  1,  1)
]
edges = [ (0,1),(1,2),(2,3),(3,0), (4,5),(5,6),(6,7),(7,4), (0,4),(1,5),(2,6),(3,7) ]

for step in range(36):
{
    a = 2*math.pi*(step/36.0)
    sa = math.sin(a); ca = math.cos(a)
    sb = math.sin(a*0.7); cb = math.cos(a*0.7)

    inner = ""
    # transform -> project
    pts2d = []
    for (x,y,z) in verts:
    {
        # scale
        x = x*size; y = y*size; z = z*size
        # rotate Y then X
        xr = x*cb + z*sb
        zr = -x*sb + z*cb
        yr = y*ca - zr*sa
        zr = y*sa + zr*ca
        # perspective
        s = fov / (fov + zr + 120)  # shift Z to keep positive
        X = cx + xr*s
        Y = cy + yr*s
        pts2d.append((X,Y))
    }
    # draw edges
    for (i,j) in edges:
    {
        p = pts2d[i]; q = pts2d[j]
        inner = inner + svg_line(p[0], p[1], q[0], q[1], "#2c3e50", 2)
    }
    print(svg_wrap(w, h, inner))
}
```

