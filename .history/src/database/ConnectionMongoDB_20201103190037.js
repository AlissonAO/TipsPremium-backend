const MongoClient = require('mongodb').MongoClient;
const config = require('../../MongConfig');
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
