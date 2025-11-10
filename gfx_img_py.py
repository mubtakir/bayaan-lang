# Lightweight Pillow wrappers for Bayan gfx image support
# Provides simple canvas creation, drawing primitives, and data URI export

from typing import Tuple, Optional
import io
import base64

try:
    from PIL import Image, ImageDraw, ImageFont
except Exception as e:  # Pillow may not be installed yet
    Image = None
    ImageDraw = None
    ImageFont = None


def _ensure_pillow():
    if Image is None or ImageDraw is None:
        raise RuntimeError("Pillow (PIL) is not installed. Please install with: pip install Pillow")


def _parse_color(color: Optional[str]) -> Optional[Tuple[int, int, int, int]]:
    """Accepts CSS-like hex (#rgb/#rgba/#rrggbb/#rrggbbaa) or named None."""
    if not color:
        return None
    c = color.strip()
    if c.startswith('#'):
        c = c[1:]
        if len(c) == 3:
            r, g, b = (int(c[i] * 2, 16) for i in range(3))
            return (r, g, b, 255)
        if len(c) == 4:
            r, g, b, a = (int(c[i] * 2, 16) for i in range(4))
            return (r, g, b, a)
        if len(c) == 6:
            r = int(c[0:2], 16)
            g = int(c[2:4], 16)
            b = int(c[4:6], 16)
            return (r, g, b, 255)
        if len(c) == 8:
            r = int(c[0:2], 16)
            g = int(c[2:4], 16)
            b = int(c[4:6], 16)
            a = int(c[6:8], 16)
            return (r, g, b, a)
    # Fallback: return None so Pillow can parse named colors if any
    return color  # type: ignore


def new(width: int, height: int, bg: str = "#ffffff"):
    _ensure_pillow()
    mode = "RGBA"
    col = _parse_color(bg) or bg
    img = Image.new(mode, (int(width), int(height)), col)
    return img


def draw_rect(img, x: int, y: int, w: int, h: int, fill: Optional[str] = None,
              outline: Optional[str] = "#000000", width: int = 1):
    _ensure_pillow()
    dr = ImageDraw.Draw(img)
    f = _parse_color(fill) if fill is not None else None
    o = _parse_color(outline) if outline is not None else None
    dr.rectangle([x, y, x + w, y + h], fill=f, outline=o, width=int(width))
    return img


def draw_circle(img, cx: int, cy: int, r: int, fill: Optional[str] = None,
                outline: Optional[str] = "#000000", width: int = 1):
    _ensure_pillow()
    dr = ImageDraw.Draw(img)
    f = _parse_color(fill) if fill is not None else None
    o = _parse_color(outline) if outline is not None else None
    dr.ellipse([cx - r, cy - r, cx + r, cy + r], fill=f, outline=o, width=int(width))
    return img


def draw_line(img, x1: int, y1: int, x2: int, y2: int, color: str = "#000000", width: int = 1):
    _ensure_pillow()
    dr = ImageDraw.Draw(img)
    o = _parse_color(color) or color
    dr.line([x1, y1, x2, y2], fill=o, width=int(width))
    return img


def draw_text(img, x: int, y: int, text: str, fill: str = "#000000"):
    _ensure_pillow()
    dr = ImageDraw.Draw(img)
    o = _parse_color(fill) or fill
    # Default font; note: no font size control without loading a TTF (keep it simple)
    dr.text((x, y), str(text), fill=o)
    return img


def to_data_uri(img, fmt: str = "PNG") -> str:
    _ensure_pillow()
    bio = io.BytesIO()
    format_upper = (fmt or "PNG").upper()
    img.save(bio, format=format_upper)
    b64 = base64.b64encode(bio.getvalue()).decode('ascii')
    mime = 'image/png' if format_upper == 'PNG' else 'image/jpeg'
    return f"data:{mime};base64,{b64}"

