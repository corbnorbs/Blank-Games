const form = document.getElementById("search-form");
const input = document.getElementById("search-input");

form.addEventListener("submit", async (event) => {
  console.log(input.value);
  event.preventDefault();
  window.navigator.serviceWorker
    .register("https://blank-games.onrender.com/sw.js", {
      scope: __uv$config.prefix,
    })
    .then(() => {
      let url = input.value.trim();
      if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
      else if (!(url.startsWith("https://") || url.startsWith("http://"))) url = "http://" + url;
        window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
    });
});

function search(thisUrl) {
  window.navigator.serviceWorker.register('./sw.js', {
      scope: __uv$config.prefix
  }).then(() => {
      let url = thisUrl;
      if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url;
      else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url;

      window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});
};

function isUrl(val = ''){
  if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
  return false;
};