'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrencies = getCurrencies;
exports.batchUpsert = batchUpsert;
function getCurrencies(db) {
  return rp(options).then(function (currencies) {
    return batchUpsert(db, addDates(currencies));
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