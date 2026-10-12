/* PASEF · PWAAM: offline-first. Cache-first con actualización en segundo plano. */
const V='suno-analisis-v1', FILES=['./','./index.html'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==V).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(hit=>{
    const net=fetch(e.request).then(r=>{ if(r.ok&&new URL(e.request.url).origin===location.origin) caches.open(V).then(c=>c.put(e.request,r.clone())); return r; }).catch(()=>hit);
    return hit||net; })); });
