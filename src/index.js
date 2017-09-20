import express from 'express';
import bodyParser from 'body-parser';
import moment from 'moment';
import lineChart from './charts/line/chartTemplate';
import path from 'path';
import findCurrencyData from './utilities/findCurrencyData';

const app = express();
const router = express.Router();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/v1/chart/line/thumbnail/:currencySymbol/', (req, res) => {
  const { currencySymbol } = req.params;
  res.sendFile(path.join(__dirname, '', `./line-charts/${currencySymbol}.png`))
});

router.get('/v1/chart/line/:currencySymbol/:startDate/:endDate/', (req, res) => {
  const { currencySymbol, startDate, endDate } = req.params;
  res.send(lineChart(currencySymbol, startDate, endDate))
});

router.get('/linechart.js', (req, res) => {
  res.sendFile(path.join(__dirname, '', './charts/line/linechart.js'))
})

router.get('/v1/:currencySymbol/:startDate/:endDate/', (req, res) => {
  const { currencySymbol, startDate, endDate } = req.params;
  findCurrencyData(currencySymbol, moment(startDate), moment(endDate))
    .then(data =>  res.json({ data }))
    .catch(err => console.log(err));
});

router.get('*', (req, res) => {
  res.json({ message: 'this route is not supported please refer to docs!' });
});

app.use(router);
app.listen(port);
