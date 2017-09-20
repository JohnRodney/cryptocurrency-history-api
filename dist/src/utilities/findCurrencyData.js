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

function findCurrencyData(symbol, start, end) {
  var byDate = function byDate(data) {
    return data.filter(function (currency) {
      return (0, _moment2.default)(currency.date_saved).isBetween(start, end);
    });
  };

  return _mongodb.MongoClient.connect(_devmongo2.default).then(function (connectedDb) {
    return connectedDb.collection('currencies');
  }).then(function (res) {
    return res.find({ symbol: symbol }).toArray();
  }).then(function (data) {
    return new Promise(function (res, rej) {
      return res(byDate(data));
    });
  }).catch(function (err) {
    return console.log('error while fetching currency data', err);
  });
}