const MongoClient = require('mongodb').MongoClient;
const config = require('../../MongConfig');
const client = new MongoClient(config, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  { keepAlive: 1}
});

module.exports = client;
