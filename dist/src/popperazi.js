'use strict';

var _webshot = require('webshot');

var _webshot2 = _interopRequireDefault(_webshot);

var _symbols = require('./fixtures/symbols');

var _symbols2 = _interopRequireDefault(_symbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var count = 0;
_symbols2.default.reduce(function (acc, next) {
  return acc.then(function () {
    return new Promise(function (res, rej) {
      (0, _webshot2.default)('https://currency-history-api.herokuapp.com/v1/chart/line/' + next + '/2017-09-10T14:30:25.860Z/2017-09-20T20:30:07.256Z/', './dist/src/line-charts/' + next + '.jpg', {
        renderDelay: 4000,
        windowSize: {
          width: 1024 / 7.6,
          height: 768 / 7.6
        },
        shotSize: {
          width: 1024 / 7.6,
          height: 768 / 7.6
        },
        zoomFactor: 7.6,
        width: 200,
        height: 100
      }, function (err) {
        return res(console.log(next, ++count));
      });
    });
  });
}, Promise.resolve());