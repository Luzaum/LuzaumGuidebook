const https = require('https');
const fs = require('fs');

https.get('https://www.frontiersin.org/journals/veterinary-science/articles/10.3389/fvets.2025.1571683/full', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const imgs = [...data.matchAll(/https:\/\/[^"'\s]+\.(?:jpg|png|tif|jpeg)/gi)].map(m => m[0]);
    console.log('Frontiers Goggs imgs count:', imgs.length);
    console.log(imgs.slice(0, 10));
    fs.writeFileSync('scratch/goggs_imgs.json', JSON.stringify(imgs, null, 2));
  });
});
