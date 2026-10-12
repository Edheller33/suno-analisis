/* Estudio EAMR · PASEF PWAAM: offline-first (cache-first con actualización en segundo plano) */
const V='estudio-eamr-v2',FILES=['./','./index.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==V).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;   /* API de GitHub y otros orígenes: sin interceptar */
  e.respondWith(caches.match(e.request).then(hit=>{const net=fetch(e.request).then(r=>{if(r.ok&&new URL(e.request.url).origin===location.origin)caches.open(V).then(c=>c.put(e.request,r.clone()));return r}).catch(()=>hit);return hit||net}))});
