#!/usr/bin/env tsx
/**
 * Importador TBCA — BLOQUEADO sem autorização formal.
 * Ver docs/adr/ADR-nutrition-tbca-licensing.md
 */

function assertTbcaLicense() {
  const confirmed = process.env.TBCA_LICENSE_CONFIRMED === 'true'
  const reference = process.env.TBCA_LICENSE_REFERENCE?.trim()

  if (!confirmed || !reference) {
    console.error(`
Importação TBCA abortada.

A TBCA utiliza licença CC BY-NC-ND 4.0. Reprodução/importação comercial requer autorização.

Configure:
  TBCA_LICENSE_CONFIRMED=true
  TBCA_LICENSE_REFERENCE=<documento de autorização>

Nenhum dado foi alterado. license_status=blocked
`)
    process.exit(1)
  }

  return reference
}

async function main() {
  assertTbcaLicense()
  console.error('Licença confirmada, mas nenhum arquivo oficial TBCA foi fornecido nesta execução.')
  process.exit(1)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
