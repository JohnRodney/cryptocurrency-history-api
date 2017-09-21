'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (symbol, start, end) {
  return '\n    <html>\n      <head>\n        <script>\n          var Coinstaker = {};\n          Coinstaker.Config = {\n            symbol: "' + symbol + '",\n            start: "' + start + '",\n            end: "' + end + '",\n            symbols: ' + JSON.stringify(_symbols2.default) + ',\n            barChartOptions: ' + JSON.stringify(_barChart2.default) + ',\n          };\n        </script>\n        ' + _chartScripts2.default.map(function (src) {
    return '<script src="' + src + '"></script>';
  }).join('') + '\n        <script src="/financial-chart.js"></script>\n        <script src="/barchart.js"></script>\n        <style>' + (0, _chartStyles2.default)() + '</style>\n      </head>\n      <body class="my-body">\n        <div id=\'react-root\'></div>\n      </body>\n    </html>\n  ';
};

var _chartScripts = require('../line/chart-scripts.js');

var _chartScripts2 = _interopRequireDefault(_chartScripts);

var _chartStyles = require('./chart-styles');

var _chartStyles2 = _interopRequireDefault(_chartStyles);

var _symbols = require('../../fixtures/symbols');

var _symbols2 = _interopRequireDefault(_symbols);

var _barChart = require('../../settings/bar-chart');

var _barChart2 = _interopRequireDefault(_barChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }