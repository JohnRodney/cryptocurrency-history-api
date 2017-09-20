'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notSupported = exports.getHistoryBySym = exports.getLineChartJs = exports.getLineChart = exports.getThumbnail = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chartTemplate = require('../charts/line/chartTemplate');

var _chartTemplate2 = _interopRequireDefault(_chartTemplate);

var _findCurrencyData = require('../utilities/findCurrencyData');

var _findCurrencyData2 = _interopRequireDefault(_findCurrencyData);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getThumbnail = exports.getThumbnail = function getThumbnail(req, res) {
  var currencySymbol = req.params.currencySymbol;

  res.sendFile(_path2.default.join(__dirname, '', './line-charts/' + currencySymbol + '.png'));
};

var getLineChart = exports.getLineChart = function getLineChart(req, res) {
  var _req$params = req.params,
      currencySymbol = _req$params.currencySymbol,
      startDate = _req$params.startDate,
      endDate = _req$params.endDate;

  res.send((0, _chartTemplate2.default)(currencySymbol, startDate, endDate));
};

var getLineChartJs = exports.getLineChartJs = function getLineChartJs(req, res) {
  res.sendFile(_path2.default.join(__dirname, '', '../charts/line/linechart.js'));
};

var getHistoryBySym = exports.getHistoryBySym = function getHistoryBySym(req, res) {
  var _req$params2 = req.params,
      currencySymbol = _req$params2.currencySymbol,
      startDate = _req$params2.startDate,
      endDate = _req$params2.endDate;

  (0, _findCurrencyData2.default)(currencySymbol, (0, _moment2.default)(startDate), (0, _moment2.default)(endDate)).then(function (data) {
    return res.json({ data: data });
  }).catch(function (err) {
    return console.log(err);
  });
};

var notSupported = exports.notSupported = function notSupported(req, res) {
  res.json({ message: 'this route is not supported please refer to docs!' });
};