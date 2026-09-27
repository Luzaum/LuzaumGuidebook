const https = require('https');
const fs = require('fs');
const path = require('path');

function downloadFile(url, dest, referer = '') {
  return new Promise((resolve, reject) => {
    const cleanUrl = url.split('?')[0];
    const u = new URL(cleanUrl);
    const req = https.get({
      protocol: u.protocol,
      hostname: u.hostname,
      path: u.pathname,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0',
        'Accept': 'image/avif,image/webp,image/png,image/svg+xml,image/*;q=0.8,*/*;q=0.5',
        'Referer': referer || 'https://www.google.com/'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let loc = res.headers.location;
        if (!loc.startsWith('http')) loc = new URL(loc, url).href;
        return downloadFile(loc, dest, referer).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(fs.statSync(dest).size);
      });
      file.on('error', err => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    });
    req.on('error', reject);
  });
}

async function run() {
  const targetDir = path.resolve('public/consulta-vet/ahim-canina');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const tasks = [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Warm_autoimmune_hemolytic_anemia.jpg',
      dest: path.join(targetDir, 'esferocitose-esfregaco-sanguineo.jpg'),
      referer: 'https://commons.wikimedia.org/'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Red_blood_cell_agglutination_due_to_cold_agglutinin.jpg',
      dest: path.join(targetDir, 'teste-aglutinacao-salina-sat.jpg'),
      referer: 'https://commons.wikimedia.org/'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Coombs_test_schematic.png',
      dest: path.join(targetDir, 'teste-coombs-direto-dat.png'),
      referer: 'https://commons.wikimedia.org/'
    },
    {
      url: 'https://www.frontiersin.org/files/Articles/1571683/fvets-12-1571683-HTML/image_m/fvets-12-1571683-g003.jpg',
      dest: path.join(targetDir, 'teg-hipercoagulabilidade-goggs-2025.jpg'),
      referer: 'https://www.frontiersin.org/'
    },
    {
      url: 'https://www.frontiersin.org/files/Articles/1571683/fvets-12-1571683-HTML/image_m/fvets-12-1571683-g004.jpg',
      dest: path.join(targetDir, 'biomarcadores-pai1-tafi-goggs-2025.jpg'),
      referer: 'https://www.frontiersin.org/'
    }
  ];

  for (const t of tasks) {
    const filename = path.basename(t.dest);
    console.log(`Downloading ${filename}...`);
    const size = await downloadFile(t.url, t.dest, t.referer);
    console.log(`-> Saved ${filename} (${size} bytes)`);
  }

  // Mirror to dist/consulta-vet/ahim-canina
  const distDir = path.resolve('dist/consulta-vet/ahim-canina');
  if (fs.existsSync(path.resolve('dist'))) {
    if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });
    for (const f of fs.readdirSync(targetDir)) {
      fs.copyFileSync(path.join(targetDir, f), path.join(distDir, f));
    }
    console.log('Successfully mirrored to dist/consulta-vet/ahim-canina');
  }

  console.log('All 5 clinical figures successfully saved and verified!');
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
