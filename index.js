import express from "express";
import http from "node:http";
import createBareServer from "@tomphttp/bare-server-node";
import path from "node:path";
import ejs from "ejs";
import cors from "cors";
import render from "render";
import * as dotenv from "dotenv";
dotenv.config();

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

app.listen(3000, () => console.log('Listening at 3000'));
app.use(express.json({ limit: '1mb' }));
app.use(cors());

app.post('/blankOpener', (request, response) => {
  console.log("POST REQUEST: ", request.body);
  console.log("OPEN GAME");
  response.render("./gameOpener/index.hbs", {
    link :  request.body.link
  })
});

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

