const http = require('http');
const path = require('path');
const express = require('express');
const low = require('lowdb');
const WebSocket = require('ws');

const port = process.env.PORT || 3000;

const db = low('db.json');

db.defaults({
  players: []
});

const app = express()
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname))
  .get('/', getApp);

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

wss.broadcast = broadcast;

wss.on('connection', onSocketConnection);

server.listen(port, onListen);

function getApp(req, res) {
  res.render('index');
}

function onListen() {
  console.log('Server started at port ' + port);
}

function broadcast(data) {
  wss.clients.forEach(sendData);

  function sendData(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  }
}

function onSocketConnection(socket) {
  socket.on('message', onSocketMessage);

  function onSocketMessage(message) {
    try {
      message = JSON.parse(message);
    } catch (err) {
      console.log(`Cannot parse message: ${message}`, err);
    }

    if (message.device === 'nodemcu') {

    } else if (message.device === 'client') {

    }
  }
}
