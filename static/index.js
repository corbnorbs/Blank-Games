const express = require("express");
const cors = require('ejs');
const cors = require('cors');
const cors = require('render');
const app = express();
app.listen(3000, () => console.log('Listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
app.use(cors());

app.set('view engine', 'ejs');

app.post('/api', (request, response) => {
  console.log("POST REQUEST: ", request.body);
  if (request.body.reason == "open game") {
    console.log("OPEN GAME");
    response.render("./gameOpener/index.hbs", {
      link :  request.body.link
    })
  }
});