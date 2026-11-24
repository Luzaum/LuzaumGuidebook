import fs from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { diseasesSeed } from '../modules/consulta-vet/data/seed/diseases.seed';
import { DiseaseSectionRenderer } from '../modules/consulta-vet/components/disease/DiseaseSectionRenderer';
const sections = ['etiology','epidemiology','pathogenesisTransmission','pathophysiology','clinicalSignsPathophysiology','diagnosis','treatment','complications','prevention'] as const;
const results: unknown[] = []; const headings = new Set<string>();
let count = 0;
fs.writeFileSync('tmp/disease-rendering-progress.txt', '');
for (const disease of diseasesSeed.filter(d => !process.argv[2] || process.argv[2].split(',').includes(d.slug))) {
 for (const section of sections) {
  fs.appendFileSync('tmp/disease-rendering-progress.txt', `${disease.slug} ${section}\n`);
  try {
   const html = renderToStaticMarkup(<DiseaseSectionRenderer id={section} title={section} data={disease[section] ?? ''} />);
   count++;
   const objects = (html.match(/\[object Object\]/g) ?? []).length;
   if (objects) results.push({ slug: disease.slug, section, objects });
   for (const match of html.matchAll(/<h4[^>]*>(.*?)<\/h4>/g)) headings.add(match[1]);
  } catch (e) { results.push({slug:disease.slug,section,error:String(e)}); }
 }
}
fs.writeFileSync(process.argv[2] ? 'tmp/disease-rendering-additional.json' : 'tmp/disease-rendering-audit.json', JSON.stringify({count,results,headings:[...headings].sort()}, null,2));
console.log(JSON.stringify({count,results}));
