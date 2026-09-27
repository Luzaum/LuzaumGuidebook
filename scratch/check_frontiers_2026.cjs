const https = require('https');

https.get('https://www.frontiersin.org/journals/veterinary-science/articles/10.3389/fvets.2026.1783158/full', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const figMatches = [...data.matchAll(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/gi)];
    figMatches.forEach((m, i) => {
      console.log(`FIGURE ${i+1}:`, m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 300));
    });
    const imgs = [...data.matchAll(/https:\/\/www\.frontiersin\.org\/files\/Articles\/[^\s"']+\.jpg/gi)].map(m => m[0]);
    console.log('Imgs:', imgs);
  });
});
