'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findCurrencyData;

var _mongodb = require('mongodb');

var _devmongo = require('../settings/devmongo');

var _devmongo2 = _interopRequireDefault(_devmongo);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = process.env.MONGODB_URI || _devmongo2.default;

function findCurrencyData(symbol, start, end) {
  var db = _mongodb.MongoClient.connect(url);
  var currencyCollection = db.then(function (connectedDb) {
    return connectedDb.collection('currencies');
  });
  var targetCurrency = currencyCollection.then(function (res) {
    return res.find({ symbol: symbol }).toArray();
  });
  return targetCurrency.then(function (data) {
    var filterByDate = data.filter(function (currency) {
      return (0, _moment2.default)(currency.date_saved).isBetween(start, end);
    });
    return Promise.resolve(filterByDate);
  });
}