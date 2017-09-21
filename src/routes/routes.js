import path from 'path';
import lineChart from '../charts/line/chart-template';
import barChart from '../charts/bar/chart-template';
import findCurrencyData from '../utilities/findCurrencyData';
import moment from 'moment';

export const getThumbnail = (req, res) => {
  const { currencySymbol } = req.params;
  res.sendFile(path.join(__dirname, '', `../line-charts/${currencySymbol}.png`))
};

export const getLineChart = (req, res) => {
  const { currencySymbol, startDate, endDate } = req.params;
  res.send(lineChart(currencySymbol, startDate, endDate))
};

export const getBarChart = (req, res) => {
  const { currencySymbol, startDate, endDate } = req.params;
  res.send(barChart(currencySymbol, startDate, endDate))
}
/* TODO: These two functions are pretty much the same reduce this in the
 *   refactor phase */
export const getLineChartJs = (req, res) => {
  res.sendFile(path.join(__dirname, '', '../charts/line/linechart.js'))
};

export const getBarChartJs = (req, res) => {
  res.sendFile(path.join(__dirname, '', '../charts/bar/barchart.js'))
};
/* TODO END -----> */

export const getHistoryBySym = (req, res) => {
  const { currencySymbol, startDate, endDate } = req.params;
  findCurrencyData(currencySymbol, moment(startDate), moment(endDate))
    .then(data =>  res.json({ data }))
    .catch(err => console.log(err));
}

export const notSupported = (req, res) => {
  res.json({ message: 'this route is not supported please refer to docs!' });
}
