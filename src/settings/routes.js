import { getThumbnail, getLineChart, getLineChartJs, getHistoryBySym, notSupported } from './routes/routes';

export default {
  '/v1/chart/line/thumbnail/:currencySymbol/': getThumbnail,
  '/v1/chart/line/:currencySymbol/:startDate/:endDate/': getLineChart,
  '/linechart.js': getLineChartJs,
  '/v1/:currencySymbol/:startDate/:endDate/': getHistoryBySym,
  '*': notSupported,
};
