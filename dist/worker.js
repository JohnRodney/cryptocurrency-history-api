'use strict';

var _mongodb = require('mongodb');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/myproject';

var options = {
  uri: 'https://api.coinmarketcap.com/v1/ticker/',
  headers: { 'User-Agent': 'Request-Promise' },
  json: true
};

function getCurrencies(db) {
  return (0, _requestPromise2.default)(options).then(function (currencies) {
    return batchUpsert(db, addDates(currencies));
  }).catch(function (err) {
    return console.warn("There was a problem getting the currency ticker data err is:", err);
  });
}

function batchUpsert(db, currencies) {
  var currencyCollection = db.collection('currencies');
  return currencyCollection.insertMany(currencies).then(function (res) {
    return db.close();
  }).catch(function (err) {
    return Promise.resolve(console.warn('err inserting documents', err));
  });
}

function addDates(currencies) {
  return currencies.map(function (currency) {
    var currencyCopy = currency;
    currencyCopy.date_saved = (0, _moment2.default)().toISOString();
    return currencyCopy;
  });
}

var db = _mongodb.MongoClient.connect(url);

db.then(function (db) {
  return getCurrencies(db);
}).catch(function (err) {
  return Promise.resolve(console.log(err));
});
