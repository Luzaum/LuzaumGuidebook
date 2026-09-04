import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const consultaVetDir = path.join(projectRoot, 'modules', 'consulta-vet');

console.log('====================================================');
console.log('🔍 CONSULTAVET DIAGNOSTIC - SECURITY & ROUTING AUDIT');
console.log('====================================================\n');

function getAllFiles(dir, exts = ['.ts', '.tsx', '.js', '.jsx']) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, exts));
    } else {
      if (exts.some(ext => file.endsWith(ext))) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const files = getAllFiles(consultaVetDir);
console.log(`📂 Analyzed ${files.length} source files in modules/consulta-vet\n`);

const findings = {
  tabnabbingPhishing: [],
  openRedirects: [],
  unsafeHtml: [],
  unsafeStorageParsing: [],
  brokenRoutingLinks: []
};

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  const relPath = path.relative(projectRoot, file).replace(/\\/g, '/');
  const lines = content.split('\n');

  // Check 1: Target _blank without rel="noopener noreferrer" (Phishing / Reverse Tabnabbing)
  lines.forEach((line, idx) => {
    if (line.includes('target="_blank"') || line.includes("target='_blank'")) {
      const context = lines.slice(Math.max(0, idx - 4), Math.min(lines.length, idx + 5)).join(' ');
      if (!context.includes('noopener') || !context.includes('noreferrer')) {
        findings.tabnabbingPhishing.push({
          file: relPath,
          line: idx + 1,
          snippet: line.trim()
        });
      }
    }
  });

  // Check 2: dangerouslySetInnerHTML
  lines.forEach((line, idx) => {
    if (line.includes('dangerouslySetInnerHTML')) {
      findings.unsafeHtml.push({
        file: relPath,
        line: idx + 1,
        snippet: line.trim(),
        hasSanitizer: line.includes('DOMPurify') || line.includes('sanitize') || content.includes('dompurify')
      });
    }
  });

  // Check 3: JSON.parse on localStorage without try/catch
  lines.forEach((line, idx) => {
    if (line.includes('localStorage.getItem') && line.includes('JSON.parse')) {
      const context = lines.slice(Math.max(0, idx - 6), Math.min(lines.length, idx + 7)).join('\n');
      if (!context.includes('try') && !context.includes('catch')) {
        findings.unsafeStorageParsing.push({
          file: relPath,
          line: idx + 1,
          snippet: line.trim()
        });
      }
    }
  });

  // Check 4: Unvalidated window.location / redirects
  lines.forEach((line, idx) => {
    if (line.includes('window.location.href') || line.includes('window.location.replace') || line.includes('window.location.assign')) {
      findings.openRedirects.push({
        file: relPath,
        line: idx + 1,
        snippet: line.trim()
      });
    }
  });

  // Check 5: Suspicious links (e.g. href="javascript:", href="http://", or wrong relative paths)
  lines.forEach((line, idx) => {
    if (/href\s*=\s*["']javascript:/i.test(line) || /href\s*=\s*["']http:\/\//i.test(line)) {
      findings.brokenRoutingLinks.push({
        file: relPath,
        line: idx + 1,
        snippet: line.trim()
      });
    }
  });
}

console.log('--- AUDIT FINDINGS ---');
console.log(`1. Phishing / Tabnabbing Risk (_blank without noopener noreferrer): ${findings.tabnabbingPhishing.length}`);
findings.tabnabbingPhishing.forEach(f => console.log(`   [${f.file}:${f.line}] ${f.snippet}`));

console.log(`\n2. HTML Injections / dangerouslySetInnerHTML: ${findings.unsafeHtml.length}`);
findings.unsafeHtml.forEach(f => console.log(`   [${f.file}:${f.line}] Sanitized: ${f.hasSanitizer} | ${f.snippet}`));

console.log(`\n3. LocalStorage Parse Risks (causing reload crashes): ${findings.unsafeStorageParsing.length}`);
findings.unsafeStorageParsing.forEach(f => console.log(`   [${f.file}:${f.line}] ${f.snippet}`));

console.log(`\n4. Window.location / External Redirects: ${findings.openRedirects.length}`);
findings.openRedirects.forEach(f => console.log(`   [${f.file}:${f.line}] ${f.snippet}`));

console.log(`\n5. Suspicious / Insecure links: ${findings.brokenRoutingLinks.length}`);
findings.brokenRoutingLinks.forEach(f => console.log(`   [${f.file}:${f.line}] ${f.snippet}`));

// Test Vite dev server HTTP status for ConsultaVet routes
async function testDevServer() {
  console.log('\n--- VITE DEV SERVER (PORT 5173) ROUTE & RELOAD TEST ---');
  const routesToTest = [
    '/',
    '/consulta-vet',
    '/consulta-vet/doencas',
    '/consulta-vet/doencas/asma-felina',
    '/consulta-vet/doencas/doenca-renal-cronica-caes-gatos',
    '/consulta-vet/medicamentos',
    '/consulta-vet/medicamentos/amoxicilina-clavulanato',
    '/consulta-vet/apresentacoes-comerciais',
    '/consulta-vet/consensos',
    '/consulta-vet/consensos/iris-ckd-staging-guidelines-2023',
    '/consulta-vet/favoritos',
    '/consulta-vet/recentes',
    '/consulta-vet/categorias',
    '/consulta-vet/editorial',
    '/consulta-vet/manejo-emergencial',
    '/consulta-vet/guias-rapidos',
    '/consulta-vet/receituario'
  ];

  let success = 0;
  let failure = 0;

  for (const r of routesToTest) {
    const url = `http://localhost:5173${r}`;
    try {
      const res = await fetch(url, { headers: { 'Accept': 'text/html' } });
      const text = await res.text();
      const isHtml = text.includes('<html') || text.includes('<!DOCTYPE html>') || text.includes('id="root"');
      if (res.status === 200 && isHtml) {
        console.log(`✅ [${res.status}] GET ${r} -> SPA HTML served correctly (Reload test PASSED)`);
        success++;
      } else {
        console.log(`❌ [${res.status}] GET ${r} -> Failed. Status: ${res.status}, isHtml: ${isHtml}`);
        failure++;
      }
    } catch (err) {
      console.log(`❌ GET ${r} -> Error: ${err.message}`);
      failure++;
    }
  }

  console.log(`\nServer Route Test Summary: ${success} passed, ${failure} failed.`);
}

await testDevServer();
