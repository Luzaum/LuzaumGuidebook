const https = require('https');

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      console.log(url, '-->', res.statusCode, res.headers['content-type'], res.headers['location']);
      resolve(res.statusCode);
    });
    req.on('error', (e) => {
      console.log(url, 'ERR:', e.message);
      resolve(0);
    });
  });
}

async function run() {
  await checkUrl('https://www.frontiersin.org/journals/veterinary-science/articles/10.3389/fvets.2025.1571683/full');
  await checkUrl('https://commons.wikimedia.org/wiki/File:Spherocytes_in_blood_smear.jpg');
}

run();
