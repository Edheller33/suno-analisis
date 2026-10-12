/* Análisis Suno · Service Worker v2.0.0
   PASEF · PWAAM: offline-first. HTML con red primero (actualizaciones inmediatas) y caché de respaldo;
   recursos estáticos con caché primero y actualización en segundo plano. */
const V='suno-analisis-v2';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(V).then(c=>Promise.all(FILES.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==V).map(n=>caches.delete(n)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin!==location.origin)return;
  if(req.mode==='navigate'){
    e.respondWith(
      fetch(req).then(r=>{if(r.ok){const c=r.clone();caches.open(V).then(x=>x.put('./index.html',c))}return r})
        .catch(()=>caches.match('./index.html').then(h=>h||caches.match('./')))
    );
    return;
  }
  e.respondWith(caches.match(req).then(hit=>{
    const net=fetch(req).then(r=>{if(r.ok){const c=r.clone();caches.open(V).then(x=>x.put(req,c))}return r}).catch(()=>hit);
    return hit||net;
  }));
});
