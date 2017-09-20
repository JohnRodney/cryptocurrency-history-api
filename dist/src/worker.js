'use strict';

var _mongodb = require('mongodb');

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _devmongo = require('../settings/devmongo');

var _devmongo2 = _interopRequireDefault(_devmongo);

var _marketCap = require('./settings/market-cap');

var _marketCap2 = _interopRequireDefault(_marketCap);

var _mongo = require('./utilities/mongo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addDates(currencies) {
  return currencies.map(function (currency) {
    var currencyCopy = currency;
    currencyCopy.date_saved = (0, _moment2.default)().toISOString();
    return currencyCopy;
  });
}

_mongodb.MongoClient.connect(_devmongo2.default).then(function (db) {
  return (0, _mongo.getCurrencies)(db);
}).catch(function (err) {
  return Promise.resolve(console.log(err));
});