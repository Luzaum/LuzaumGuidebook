from pathlib import Path
p=Path('tmp/summary-preview.html');s=p.read_text(encoding='utf-8-sig').replace('<head>','<head><meta charset="utf-8"><link rel="icon" href="data:,">');p.write_text(s,encoding='utf8')
