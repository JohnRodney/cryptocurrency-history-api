'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrencies = getCurrencies;
exports.batchUpsert = batchUpsert;

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _transforms = require('./transforms');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCurrencies(db) {
  return (0, _requestPromise2.default)(options).then(function (currencies) {
    return batchUpsert(db, (0, _transforms.addDates)(currencies));
  }).catch(function (err) {
    return console.log("error retreiving data", err);
  });
}

function batchUpsert(db, currencies) {
  return db.collection('currencies').insertMany(currencies).then(function (res) {
    return db.close();
  }).catch(function (err) {
    return Promise.resolve(console.log('error inserting documents', err));
  });
}