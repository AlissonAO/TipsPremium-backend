const MongoClient = require('mongodb').MongoClient;
const config = require('../../MongConfig');
const client = new MongoClient(
  config,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  },
  { keepAlive: 1 }
);

module.exports = client;
