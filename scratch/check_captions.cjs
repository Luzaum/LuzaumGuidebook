const fs = require('fs');
const https = require('https');

https.get('https://www.frontiersin.org/journals/veterinary-science/articles/10.3389/fvets.2025.1571683/full', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    const figMatches = [...data.matchAll(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/gi)];
    figMatches.forEach((m, i) => {
      console.log(`FIGURE ${i+1}:`, m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 300));
    });
  });
});
