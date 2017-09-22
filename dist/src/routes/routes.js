'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notSupported = exports.getHistoryBySym = exports.getBarChartJs = exports.getFinancialChartJs = exports.getLineChartJs = exports.getBarChart = exports.getLineChart = exports.getBarPreview = exports.getThumbnail = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chartTemplate = require('../charts/line/chart-template');

var _chartTemplate2 = _interopRequireDefault(_chartTemplate);

var _chartTemplate3 = require('../charts/bar/chart-template');

var _chartTemplate4 = _interopRequireDefault(_chartTemplate3);

var _findCurrencyData = require('../utilities/findCurrencyData');

var _findCurrencyData2 = _interopRequireDefault(_findCurrencyData);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getThumbnail = exports.getThumbnail = function getThumbnail(req, res) {
  var currencySymbol = req.params.currencySymbol;

  res.sendFile(_path2.default.join(__dirname, '', '../line-charts/' + currencySymbol + '.png'));
};

var getBarPreview = exports.getBarPreview = function getBarPreview(req, res) {
  var currencySymbol = req.params.currencySymbol;

  res.sendFile(_path2.default.join(__dirname, '', '../line-charts/candlestick.png'));
};

var getLineChart = exports.getLineChart = function getLineChart(req, res) {
  var _req$params = req.params,
      currencySymbol = _req$params.currencySymbol,
      startDate = _req$params.startDate,
      endDate = _req$params.endDate;

  res.send((0, _chartTemplate2.default)(currencySymbol, startDate, endDate));
};

var getBarChart = exports.getBarChart = function getBarChart(req, res) {
  var _req$params2 = req.params,
      currencySymbol = _req$params2.currencySymbol,
      startDate = _req$params2.startDate,
      endDate = _req$params2.endDate;

  res.send((0, _chartTemplate4.default)(currencySymbol, startDate, endDate));
};
/* TODO: These two functions are pretty much the same reduce this in the
 *   refactor phase */
var getLineChartJs = exports.getLineChartJs = function getLineChartJs(req, res) {
  res.sendFile(_path2.default.join(__dirname, '', '../charts/line/linechart.js'));
};

var getFinancialChartJs = exports.getFinancialChartJs = function getFinancialChartJs(req, res) {
  res.sendFile(_path2.default.join(__dirname, '', '../charts/bar/financial-chart.js'));
};
var getBarChartJs = exports.getBarChartJs = function getBarChartJs(req, res) {
  res.sendFile(_path2.default.join(__dirname, '', '../charts/bar/barchart.js'));
};
/* TODO END -----> */

var getHistoryBySym = exports.getHistoryBySym = function getHistoryBySym(req, res) {
  var _req$params3 = req.params,
      currencySymbol = _req$params3.currencySymbol,
      startDate = _req$params3.startDate,
      endDate = _req$params3.endDate;

  (0, _findCurrencyData2.default)(currencySymbol, (0, _moment2.default)(startDate), (0, _moment2.default)(endDate)).then(function (data) {
    return res.json({ data: data });
  }).catch(function (err) {
    return console.log(err);
  });
};

var notSupported = exports.notSupported = function notSupported(req, res) {
  res.json({ message: 'this route is not supported please refer to docs!' });
};