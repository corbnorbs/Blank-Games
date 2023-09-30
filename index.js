import express from "express";
import http from "node:http";
import Datastore from 'nedb'
import createBareServer from "@tomphttp/bare-server-node";
import path from "node:path";
import * as dotenv from "dotenv";
dotenv.config();

const database = new Datastore('database.db');
database.loadDatabase();

const __dirname = process.cwd();
const server = http.createServer();
const app = express(server);
const bareServer = createBareServer("/outerspace/");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "static")));

const routes = [
  { path: "/", file: "index.html" },
  { path: "/news", file: "apps.html" },
  { path: "/algebra", file: "games.html" },
  { path: "/settings", file: "settings.html" },
  { path: "/tabs", file: "tabs.html" },
  { path: "/tabinner", file: "tabinner.html" },
  { path: "/go", file: "go.html" },
  { path: "/loading", file: "loading.html" },
  { path: "/404", file: "404.html" },
];

routes.forEach((route) => {
  app.get(route.path, (req, res) => {
    res.sendFile(path.join(__dirname, "static", route.file));
  });
});

app.get('/api', (request,response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

//app.get("/*", (req, res) => {
  //res.redirect("/404");
//});

// Bare Server 
server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.on("listening", () => {
  console.log(`Interstellar running at http://localhost:${process.env.PORT}`);
});

server.listen({
  port: 8080,
});

