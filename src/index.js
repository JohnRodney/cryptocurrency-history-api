import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017/myproject';

MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to server");
  db.close();
});
