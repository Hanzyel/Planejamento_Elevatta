const CACHE='elevatta-app-2026-10-27-1';
const CORE=['/','/index.html','/base.css','/interface.css','/app.js','/seed.js','/jszip.min.js','/pwa.js','/manifest.webmanifest','/icon-192.png','/icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE))));
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE_UPDATE')self.skipWaiting();});
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>(k.startsWith('elevatta-app-')||k.startsWith('obras-painel-'))&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim();})()));
self.addEventListener('fetch',event=>{
 const req=event.request,url=new URL(req.url);
 if(req.method!=='GET'||url.origin!==self.location.origin)return;
 if(req.mode==='navigate'){
  event.respondWith((async()=>{
   try{const res=await fetch(req);if(res.ok&&res.headers.get('content-type')?.includes('text/html'))return res;}catch{}
   const cache=await caches.open(CACHE),fallback=await cache.match('/index.html');
   return fallback||new Response('Conecte-se à internet para abrir o Planejamento Elevatta pela primeira vez.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
  })());return;
 }
 if(CORE.includes(url.pathname))event.respondWith((async()=>{const cache=await caches.open(CACHE),cached=await cache.match(url.pathname);return cached||fetch(req);})());
});
