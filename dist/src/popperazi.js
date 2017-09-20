'use strict';

var _webshot = require('webshot');

var _webshot2 = _interopRequireDefault(_webshot);

var _symbols = require('./fixtures/symbols');

var _symbols2 = _interopRequireDefault(_symbols);

var _webshotOptions = require('./settings/webshot-options');

var _webshotOptions2 = _interopRequireDefault(_webshotOptions);

var _getUrlFromSym = require('./utilities/getUrlFromSym');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var count = 0;
var err = function err(next, res) {
  return function (err) {
    return res(console.log(next, ++count));
  };
};
var snapshot = function snapshot(next) {
  return function (res, rej) {
    return (0, _webshot2.default)((0, _getUrlFromSym.getURL)(next), (0, _getUrlFromSym.getPath)(next), _webshotOptions2.default, err(next, res));
  };
};

_symbols2.default.reduce(function (acc, next) {
  return acc.then(function () {
    return new Promise(snapshot(next));
  });
}, Promise.resolve()).catch(err(null));