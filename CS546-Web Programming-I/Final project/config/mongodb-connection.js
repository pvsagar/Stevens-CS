const MongoClient = require("mongodb").MongoClient;

const settings = {
    mongoConfig: {
        serverUrl: "mongodb://localhost:27017/",
        database: "db-free-lancer"
    }
};

const mongoConfig = settings.mongoConfig;

let fullMongoUrl = `${mongoConfig.serverUrl}`;
let _connection = undefined;
let _db = undefined;

module.exports = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(fullMongoUrl);
    _db = await _connection.db(mongoConfig.database);
  }

  return _db;
};