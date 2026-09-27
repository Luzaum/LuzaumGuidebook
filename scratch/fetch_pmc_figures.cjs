const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', err => reject(err));
    });
  });
}

async function main() {
  console.log('Fetching PMC6430921 figure 2 page...');
  const html1 = await fetchText('https://pmc.ncbi.nlm.nih.gov/articles/PMC6430921/figure/jvim15441-fig-0002/');
  fs.writeFileSync('scratch/fig2_pmc6430921.html', html1);
  console.log('Saved scratch/fig2_pmc6430921.html, length:', html1.length);

  console.log('Fetching PMC12177219 figure 2 page...');
  const html2 = await fetchText('https://pmc.ncbi.nlm.nih.gov/articles/PMC12177219/figure/F2/');
  fs.writeFileSync('scratch/fig2_pmc12177219.html', html2);
  console.log('Saved scratch/fig2_pmc12177219.html, length:', html2.length);
}

main().catch(console.error);
