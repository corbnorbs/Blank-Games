function search(thisUrl) {
  window.navigator.serviceWorker.register('https://blank-games.onrender.com/sw.js', {
      scope: __uv$config.prefix
  }).then(() => {
      let url = thisUrl;
      if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
      else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;

      window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});
};