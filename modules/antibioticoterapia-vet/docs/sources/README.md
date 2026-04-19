# Fontes em PDF (referência local)

Coloque aqui os PDFs que servem de base para **revisão clínica**, **fisiopatologia** e **alinhamento ao guia institucional**. O Cursor e scripts locais podem extrair texto a partir desta pasta.

## Ficheiros atuais

| Ficheiro | Uso típico no módulo |
|----------|----------------------|
| `Guia_CCIH_2024.pdf` | Antibioticoterapia, profilaxia, stewardship, mapeamentos v2 / `ccih2024PageAudit` |
| `NELSON E COUTO 6_compressed (3).pdf` | Medicina interna de pequenos animais — quadros clínicos e raciocínio |
| `Cunningham's Textbook of Veterinary Physiology, 6th Edition.pdf` | Fisiologia — bases para fisiopatologia e mecanismos |
| `Practical Guide to Canine and Feline Neurology, 3rd Edition (VetBooks.ir)_compressed.pdf` | Neurologia — condições e contexto clínico quando aplicável |

## Regras de uso no produto

- O **conteúdo do app** deve ser **paráfrase clínica** com referência à edição/fonte, não cópia extensa de obras protegidas.
- O **Guia CCIH** já está integrado ao modelo institucional via metadados e audit de páginas em `data-v2/ccih2024PageAudit.ts` (sem distribuir o PDF ao cliente, salvo decisão de produto).
- Para enriquecer fichas (`pathophysiologyFull`, `pathophysiologyVisual`), extrair trechos com ferramentas locais e **validar** com o protocolo da sua instituição.

## Extração de texto (desenvolvimento)

Exemplo com Python (`pypdf`):

```bash
python -c "from pypdf import PdfReader; r=PdfReader('Guia_CCIH_2024.pdf'); print(r.pages[0].extract_text()[:2000])"
```

## Git

Os `*.pdf` desta pasta estão ignorados no `.gitignore` da raiz do repositório para evitar commits muito grandes. Mantenha uma cópia local ou use **Git LFS** se a equipa precisar versionar os binários.
