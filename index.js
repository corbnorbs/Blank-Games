import express from "express";
import http from "node:http";
import createBareServer from "@tomphttp/bare-server-node";
import path from "node:path";
import * as dotenv from "dotenv";
var express = require('express');
var ejs = require('ejs');
var app = express();
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
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index', {
    word: "nahhh"
  });
});

app.listen(3000, () => console.log('Listening at 3000'));

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

