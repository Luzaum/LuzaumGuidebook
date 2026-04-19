/**
 * Extrai texto do PDF de neurologia para inventário e matriz capítulo → módulos.
 * Uso: node scripts/extract-neuro-pdf-outline.mjs
 * Requer: pdfjs-dist (já em devDependencies do projeto)
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const PDF_REL =
  'modules/antibioticoterapia-vet/docs/sources/Practical Guide to Canine and Feline Neurology, 3rd Edition (VetBooks.ir)_compressed.pdf'
const pdfPath = path.join(root, PDF_REL)

async function main() {
  if (!fs.existsSync(pdfPath)) {
    console.error('PDF não encontrado:', pdfPath)
    process.exit(1)
  }

  const data = new Uint8Array(fs.readFileSync(pdfPath))
  const loadingTask = pdfjsLib.getDocument({ data, useSystemFonts: true })
  const pdf = await loadingTask.promise
  const numPages = pdf.numPages

  const outDir = path.join(root, 'modules/neurologia/docs')
  fs.mkdirSync(outDir, { recursive: true })

  const previewPages = Math.min(40, numPages)
  let preview = ''
  for (let p = 1; p <= previewPages; p++) {
    const page = await pdf.getPage(p)
    const textContent = await page.getTextContent()
    const strings = textContent.items.map((it) => ('str' in it ? it.str : '')).join(' ')
    preview += `\n\n--- Página ${p} ---\n${strings}\n`
  }

  fs.writeFileSync(path.join(outDir, 'pdf-text-preview.txt'), preview, 'utf8')

  const summary = {
    source: PDF_REL,
    numPages,
    extractedPreviewPages: previewPages,
    generatedAt: new Date().toISOString(),
  }
  fs.writeFileSync(path.join(outDir, 'pdf-extraction-meta.json'), JSON.stringify(summary, null, 2), 'utf8')

  console.log('OK:', numPages, 'páginas. Preview em modules/neurologia/docs/pdf-text-preview.txt')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
