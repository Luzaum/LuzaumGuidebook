function i(r){return String(r||"").split(/\r?\n/g).map(t=>t.trim()).filter(Boolean)}function e(r){return Array.isArray(r)?r.join(`
`):""}function o(r){return typeof r=="string"?r:Array.isArray(r)?r.join(`
`):JSON.stringify(r,null,2)}function a(r){const t=String(r||"").trim();if(!t)return"";if(t.startsWith("{")||t.startsWith("["))return JSON.parse(t);const n=i(t);return n.length>1?n:t}function s(r){return String(r||"").trim()||null}function p(r){const t=String(r||"").trim();return t?t.replace(/<br\s*\/?>/gi,`
`).replace(/<\/p>\s*<p>/gi,`

`).replace(/<[^>]+>/g,"").replace(/&nbsp;/gi," ").trim():""}function l(r){const t=String(r||"").split(/\r?\n\r?\n/g).map(n=>n.trim()).filter(Boolean);return t.length===0?"<p></p>":t.map(n=>`<p>${n.replace(/\r?\n/g,"<br />")}</p>`).join("")}export{e as a,l as e,o as f,p as h,s as n,a as p,i as s};
