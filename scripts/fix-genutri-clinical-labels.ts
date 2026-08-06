import { readFileSync, writeFileSync } from 'node:fs'

const path = 'modules/energia-vet/data/genutri-dataset.json'
let content = readFileSync(path, 'utf8')
content = content
  .replace(/"condition": "Cancer /g, '"condition": "Câncer ')
  .replace(/"label": "Cancer /g, '"label": "Câncer ')
  .replace(/Inflamatoria/g, 'Inflamatória')
writeFileSync(path, content)
console.log('GENUTRI visible labels updated')
