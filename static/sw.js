importScripts("https://blank-games.onrender.com/h/uv.bundle.js");
importScripts("https://blank-games.onrender.com/h/uv.config.js");
importScripts("https://blank-games.onrender.com/h/uv.sw.js");

const sw = new UVServiceWorker();
let userKey = new URL(location).searchParams.get('userkey');

self.addEventListener("fetch", (event) => event.respondWith(sw.fetch(event)));