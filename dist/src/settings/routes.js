'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _routes = require('../routes/routes');

exports.default = {
  '/v1/chart/line/thumbnail/:currencySymbol/': _routes.getThumbnail,
  '/v1/chart/bar/preview/': _routes.getBarPreview,
  '/v1/chart/line/preview/': _routes.getLinePreview,
  '/v1/chart/line/:currencySymbol/:startDate/:endDate/': _routes.getLineChart,
  '/v1/chart/bar/:currencySymbol/:startDate/:endDate/': _routes.getBarChart,
  '/linechart.js': _routes.getLineChartJs,
  '/barchart.js': _routes.getBarChartJs,
  '/financial-chart.js': _routes.getFinancialChartJs,
  '/v1/:currencySymbol/:startDate/:endDate/': _routes.getHistoryBySym,
  '*': _routes.notSupported
};