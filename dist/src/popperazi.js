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
_symbols2.default.reduce(function (acc, next) {
  return acc.then(function () {
    return new Promise(function (res, rej) {
      (0, _webshot2.default)((0, _getUrlFromSym.getURL)(next), (0, _getUrlFromSym.getPath)(sym), _webshotOptions2.default, function (err) {
        return res(console.log(next, ++count));
      });
    });
  });
}, Promise.resolve());