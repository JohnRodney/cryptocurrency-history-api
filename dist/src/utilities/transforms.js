"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDates = addDates;
function addDates(currencies) {
  return currencies.map(function (currency) {
    var currencyCopy = currency;
    currencyCopy.date_saved = moment().toISOString();
    return currencyCopy;
  });
}