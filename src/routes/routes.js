import path from 'path';
import lineChart from '../charts/line/chartTemplate';
import findCurrencyData from '../utilities/findCurrencyData';
import moment from 'moment';

export const getThumbnail = (req, res) => {
  const { currencySymbol } = req.params;
  res.sendFile(path.join(__dirname, '', `./line-charts/${currencySymbol}.png`))
};

export const getLineChart = (req, res) => {
  const { currencySymbol, startDate, endDate } = req.params;
  res.send(lineChart(currencySymbol, startDate, endDate))
};

export const getLineChartJs = (req, res) => {
  res.sendFile(path.join(__dirname, '', '../charts/line/linechart.js'))
};

export const getHistoryBySym = (req, res) => {
  const { currencySymbol, startDate, endDate } = req.params;
  findCurrencyData(currencySymbol, moment(startDate), moment(endDate))
    .then(data =>  res.json({ data }))
    .catch(err => console.log(err));
}

export const notSupported = (req, res) => {
  res.json({ message: 'this route is not supported please refer to docs!' });
}
