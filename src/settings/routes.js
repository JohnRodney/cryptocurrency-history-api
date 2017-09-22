import {
  getThumbnail,
  getLineChart,
  getBarChart,
  getLineChartJs,
  getFinancialChartJs,
  getBarChartJs,
  getHistoryBySym,
  getBarPreview,
  getLinePreview,
  notSupported,
} from '../routes/routes';

export default {
  '/v1/chart/line/thumbnail/:currencySymbol/': getThumbnail,
  '/v1/chart/bar/preview/': getBarPreview,
  '/v1/chart/line/preview/': getLinePreview,
  '/v1/chart/line/:currencySymbol/:startDate/:endDate/': getLineChart,
  '/v1/chart/bar/:currencySymbol/:startDate/:endDate/': getBarChart,
  '/linechart.js': getLineChartJs,
  '/barchart.js': getBarChartJs,
  '/financial-chart.js': getFinancialChartJs,
  '/v1/:currencySymbol/:startDate/:endDate/': getHistoryBySym,
  '*': notSupported,
};
