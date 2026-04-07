"""Remove fundo escuro (ligado às bordas) e redimensiona PNGs do seletor Tipo de dieta."""
from __future__ import annotations

from collections import deque

import numpy as np
from PIL import Image

BASE = r"C:\Users\Resgate\VetiusLink\public"
FILES = ["diet-type-comercial.png", "diet-type-natural.png", "diet-type-hibrido.png"]


def process_png(src: str, dst: str, *, dark_cutoff: int = 48, max_long_edge: int = 1024) -> None:
    im = Image.open(src).convert("RGBA")
    arr = np.array(im)
    h, w = arr.shape[:2]

    visited = np.zeros((h, w), dtype=bool)
    q: deque[tuple[int, int]] = deque()

    def is_bg_dark(rgb: np.ndarray) -> bool:
        return int(rgb[0]) < dark_cutoff and int(rgb[1]) < dark_cutoff and int(rgb[2]) < dark_cutoff

    for x in range(w):
        if is_bg_dark(arr[0, x, :3]):
            q.append((x, 0))
        if is_bg_dark(arr[h - 1, x, :3]):
            q.append((x, h - 1))
    for y in range(h):
        if is_bg_dark(arr[y, 0, :3]):
            q.append((0, y))
        if is_bg_dark(arr[y, w - 1, :3]):
            q.append((w - 1, y))

    while q:
        x, y = q.popleft()
        if visited[y, x]:
            continue
        if not is_bg_dark(arr[y, x, :3]):
            continue
        visited[y, x] = True
        arr[y, x, 3] = 0
        for dx, dy in ((0, 1), (0, -1), (1, 0), (-1, 0)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not visited[ny, nx]:
                q.append((nx, ny))

    r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]
    near = (r < 28) & (g < 28) & (b < 28) & (a > 0)
    arr[near, 3] = 0

    out = Image.fromarray(np.uint8(arr))
    w0, h0 = out.size
    long_edge = max(w0, h0)
    if long_edge > max_long_edge:
        out.thumbnail((max_long_edge, max_long_edge), Image.Resampling.LANCZOS)
    out.save(dst, "PNG", optimize=True)
    print("saved", dst, out.size)


def main() -> None:
    for name in FILES:
        path = f"{BASE}/{name}"
        process_png(path, path)


if __name__ == "__main__":
    main()
