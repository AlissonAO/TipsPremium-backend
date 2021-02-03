const MongoClient = require('mongodb');
const config = require('../../MongConfig');
const client = new MongoClient(config, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = client;
