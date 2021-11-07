const express = require('express');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebSocket } = require('./webSocket/webSocketio');
const { conectarBetfairSocket } = require('./controller/BetfairSocket');
const Betfair = require('../src/apiBetFair/index');
const clientMongo = require('./database/ConnectionMongoDB');
const app = express();
var tls = require('tls');

const server = http.Server(app);

betfair = new Betfair(
  'XQzvGbEmSL9JwR7n',
  'psyalisson@gmail.com',
  'AliMit@123',
  true
);
setupWebSocket(server);

clientMongo.connect();

app.use(cors());

app.use(express.json());
app.use(routes);

server.listen(process.env.PORT || 8080);
