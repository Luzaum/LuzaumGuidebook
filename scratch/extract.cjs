const fs = require('fs');

['scratch/fig2_pmc6430921.html', 'scratch/fig2_pmc12177219.html'].forEach(f => {
  const txt = fs.readFileSync(f, 'utf8');
  const imgs = [...txt.matchAll(/<img[^>]+src="([^"]+)"/gi)].map(m => m[1]);
  console.log(f, imgs);
  const links = [...txt.matchAll(/<a[^>]+href="([^"]+)"/gi)].map(m => m[1]).filter(u => u.includes('.jpg') || u.includes('.png') || u.includes('/bin/'));
  console.log('links:', links);
});
