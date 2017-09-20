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
/* Catch the error and report the error count and symbol if the call to URL
 * fails to screenshot */
var err = function err(next, res) {
  return function (err) {
    return res(console.log(err, next, ++count));
  };
};
/* Perform the screenshot generating a url and path from the symbol
 *   webshot spins up phantomjs and takes an image of the chart then saves it
 *   to the server's public directory */
var snapshot = function snapshot(next) {
  return function (res, rej) {
    return (0, _webshot2.default)((0, _getUrlFromSym.getURL)(next), (0, _getUrlFromSym.getPath)(next), _webshotOptions2.default, err(next, res));
  };
};

/* Iterate over the array of symbols and take a screenshot and save an image for each one */
_symbols2.default.reduce(function (acc, next) {
  return acc.then(function () {
    return new Promise(snapshot(next));
  });
}, Promise.resolve()).catch(err(null));