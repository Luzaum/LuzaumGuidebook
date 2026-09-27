const https = require('https');
const fs = require('fs');

function downloadFile(url, dest) {
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
        'Referer': 'https://commons.wikimedia.org/'
      }
    }, (res) => {
      console.log('Status for', u.pathname.split('/').pop(), ':', res.statusCode);
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('Status ' + res.statusCode));
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(fs.statSync(dest).size); });
    });
    req.on('error', reject);
  });
}

downloadFile('https://upload.wikimedia.org/wikipedia/commons/d/d0/Warm_autoimmune_hemolytic_anemia.jpg', 'scratch/test_spherocytes.jpg')
  .then(s => console.log('Success spherocytes:', s))
  .catch(console.error);
