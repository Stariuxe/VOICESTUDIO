const CACHE='jena-static-v2';
const STATIC_ASSETS=['/manifest.json','/jena-icon.svg'];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener('fetch',event=>{
  const request=event.request;
  const url=new URL(request.url);
  if(request.method!=='GET'||url.origin!==self.location.origin)return;
  // Never cache authenticated pages, API responses, or user-specific content.
  if(url.pathname.startsWith('/api/')||request.mode==='navigate')return;
  if(!url.pathname.endsWith('.svg')&&!url.pathname.endsWith('.json'))return;
  event.respondWith(caches.match(request).then(cached=>cached||fetch(request)));
});
