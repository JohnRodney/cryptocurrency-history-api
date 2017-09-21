'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (symbol, start, end) {
  return '\n    <html>\n      <head>\n        <script>\n          var Coinstaker = {};\n          Coinstaker.Config = {\n            symbol: "' + symbol + '",\n            start: "' + start + '",\n            end: "' + end + '",\n            symbols: ' + JSON.stringify(_symbols2.default) + ',\n            barChartOptions: ' + JSON.stringify(_lineChart2.default) + ',\n          };\n        </script>\n        ' + _chartScripts2.default.map(function (src) {
    return '<script src="' + src + '"></script>';
  }).join('') + '\n        <script src="/barchart.js"></script>\n        <style>' + (0, _chartStyes2.default)() + '</style>\n      </head>\n      <body class="my-body">\n        <canvas id="myChart" width="400" height="400"></canvas>\n      </body>\n    </html>\n  ';
};

var _chartScripts = require('../line/chart-scripts.js');

var _chartScripts2 = _interopRequireDefault(_chartScripts);

var _chartStyes = require('../line/chart-styes.js');

var _chartStyes2 = _interopRequireDefault(_chartStyes);

var _symbols = require('../../fixtures/symbols');

var _symbols2 = _interopRequireDefault(_symbols);

var _lineChart = require('../../settings/line-chart');

var _lineChart2 = _interopRequireDefault(_lineChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }