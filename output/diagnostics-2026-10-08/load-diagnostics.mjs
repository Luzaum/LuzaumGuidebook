import fs from 'node:fs';
import { performance } from 'node:perf_hooks';
const base = 'http://127.0.0.1:4188';
const asset = fs.readdirSync('dist/assets').find(x=>/^index-.*\.js$/.test(x));
const urls = ['/', '/login', '/calculadora-energetica', '/assets/'+asset];
const results = [];
for (const concurrency of [1,6,12]) {
  const measurements = []; let issued=0;
  const start = performance.now();
  await Promise.all(Array.from({length:concurrency},async()=>{
    while(issued<120){const i=issued++;const t=performance.now();
      try{const r=await fetch(base+urls[i%urls.length],{signal:AbortSignal.timeout(10000)});const b=await r.arrayBuffer();measurements.push({ms:performance.now()-t,status:r.status,bytes:b.byteLength});}
      catch(e){measurements.push({ms:performance.now()-t,error:e.name});}
    }
  }));
  const durationMs=performance.now()-start;
  const times=measurements.map(x=>x.ms).sort((a,b)=>a-b);
  results.push({concurrency,requests:measurements.length,errors:measurements.filter(x=>x.error||x.status!==200).length,durationMs,requestsPerSecond:measurements.length/(durationMs/1000),p50Ms:times[Math.floor(times.length*.5)],p95Ms:times[Math.floor(times.length*.95)],maxMs:times.at(-1)});
}
fs.writeFileSync('output/diagnostics-2026-10-08/load-results.json',JSON.stringify({scope:'local Vite preview static files; not CDN, API or database capacity',urls,results},null,2));
console.log(JSON.stringify(results));
