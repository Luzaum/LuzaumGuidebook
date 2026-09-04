/**
 * Extrai trechos dos livros-base NeuroVET (Desktop) para consulta editorial interna.
 * Uso: node scripts/extract-neuro-books.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '../modules/neurologia/docs')

const BOOKS = [
  {
    id: 'practical-guide-3ed',
    title: 'Practical Guide to Canine and Feline Neurology, 3rd ed. (Dewey & da Costa)',
    path: String.raw`C:\Users\luzau\OneDrive\Desktop\Livros\Practical Guide to Canine and Feline Neurology, 3rd Edition (VetBooks.ir).pdf`,
    chapters: [
      { id: 'signalment-history', title: 'Signalment and History', start: 1, end: 8 },
      { id: 'neuro-exam', title: 'Neurologic Examination', start: 9, end: 28 },
      { id: 'lesion-localization', title: 'Lesion Localization', start: 29, end: 52 },
      { id: 'differential-diagnosis', title: 'Differential Diagnosis', start: 53, end: 60 },
      { id: 'neurodiagnostics', title: 'Neurodiagnostics', start: 61, end: 86 },
      { id: 'myelopathies', title: 'Myelopathies', start: 329, end: 404 },
      { id: 'cauda-equina', title: 'Cauda Equina', start: 405, end: 422 },
      { id: 'seizures', title: 'Seizures', start: 249, end: 268 },
      { id: 'vestibular', title: 'Vestibulocochlear', start: 277, end: 298 },
    ],
  },
  {
    id: 'delahunta-5ed',
    title: "de Lahunta's Veterinary Neuroanatomy and Clinical Neurology, 5th ed.",
    path: String.raw`C:\Users\luzau\OneDrive\Desktop\Livros\de Lahunta's Veterinary Neuroanatomy and Clinical Neurology, 5th Edition (VetBooks.ir).pdf`,
    chapters: [
      { id: 'neuroanatomy-overview', title: 'Overview', start: 1, end: 30 },
      { id: 'spinal-cord', title: 'Spinal cord segments', start: 180, end: 230 },
      { id: 'brain-stem-cerebellum', title: 'Brain stem and cerebellum', start: 250, end: 320 },
    ],
  },
]

async function extractPages(pdfPath, start, end) {
  const data = new Uint8Array(fs.readFileSync(pdfPath))
  const pdf = await pdfjsLib.getDocument({ data, useSystemFonts: true }).promise
  const from = Math.max(1, start)
  const to = Math.min(end, pdf.numPages)
  const pages = []

  for (let p = from; p <= to; p++) {
    const page = await pdf.getPage(p)
    const textContent = await page.getTextContent()
    const text = textContent.items.map((it) => ('str' in it ? it.str : '')).join(' ').replace(/\s+/g, ' ').trim()
    pages.push({ page: p, text })
  }

  return { numPages: pdf.numPages, pages }
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true })
  const manifest = { generatedAt: new Date().toISOString(), books: [] }

  for (const book of BOOKS) {
    if (!fs.existsSync(book.path)) {
      console.warn('PDF ausente:', book.path)
      continue
    }
    console.log('Extraindo', book.id, '...')
    const bookOut = { id: book.id, title: book.title, path: book.path, chapters: [] }

    for (const ch of book.chapters) {
      const { numPages, pages } = await extractPages(book.path, ch.start, ch.end)
      bookOut.numPages = numPages
      const chapterText = pages.map((p) => p.text).join('\n\n')
      const outFile = path.join(outDir, `${book.id}--${ch.id}.txt`)
      fs.writeFileSync(
        outFile,
        `# ${book.title}\n## ${ch.title} (págs. ${ch.start}–${ch.end})\n\n${pages.map((p) => `--- p.${p.page} ---\n${p.text}`).join('\n\n')}\n`,
        'utf8',
      )
      bookOut.chapters.push({
        ...ch,
        outFile: path.relative(outDir, outFile),
        charCount: chapterText.length,
        pageCount: pages.length,
      })
      console.log('  ', ch.id, pages.length, 'págs,', chapterText.length, 'chars')
    }

    manifest.books.push(bookOut)
  }

  fs.writeFileSync(path.join(outDir, 'books-extraction-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8')
  console.log('OK manifest:', path.join(outDir, 'books-extraction-manifest.json'))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
