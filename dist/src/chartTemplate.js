'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (symbol, start, end) {
  return '\n    <body>\n      <script>\n        var Coinstaker = {};\n        Coinstaker.Config = {\n          symbol: "' + symbol + '",\n          start: "' + start + '",\n          end: "' + end + '",\n        };\n      </script>\n      ' + _chartScripts2.default.map(function (src) {
    return '<script src="' + src + '"></script>';
  }).join('') + '\n      <script src="/linechart.js"></script>\n      <style>' + (0, _chartStyes2.default)() + '</style>\n      <canvas id="myChart" width="400" height="400"></canvas>\n    </body>\n  ';
};

var _chartScripts = require('./chartScripts.js');

var _chartScripts2 = _interopRequireDefault(_chartScripts);

var _chartStyes = require('./chartStyes.js');

var _chartStyes2 = _interopRequireDefault(_chartStyes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }