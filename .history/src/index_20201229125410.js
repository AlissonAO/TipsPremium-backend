const express = require('express');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebSocket } = require('./webSocket/webSocketio');
const Betfair = require('../src/apiBetFair/index');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

betfair = new Betfair(
  'XQzvGbEmSL9JwR7n',
  'psyalisson@gmail.com',
  'alisson1985',
  true
);
app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(8080);
