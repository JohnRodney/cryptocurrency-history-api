'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _routes = require('./routes/routes');

exports.default = {
  '/v1/chart/line/thumbnail/:currencySymbol/': _routes.getThumbnail,
  '/v1/chart/line/:currencySymbol/:startDate/:endDate/': _routes.getLineChart,
  '/linechart.js': _routes.getLineChartJs,
  '/v1/:currencySymbol/:startDate/:endDate/': _routes.getHistoryBySym,
  '*': _routes.notSupported
};