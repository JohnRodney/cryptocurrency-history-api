import { MongoClient } from 'mongodb';
import express from 'express';
import bodyParser from 'body-parser';
import moment from 'moment';
import lineChart from './chartTemplate';
import path from 'path';

const app = express();
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/myproject';
const router = express.Router();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
router.get('/v1/chart/line/:currencySymbol/:startDate/:endDate/', (req, res) => {
  const { currencySymbol, startDate, endDate } = req.params;
  res.send(lineChart(currencySymbol, startDate, endDate))
});

router.get('/linechart.js', (req, res) => {
  res.sendFile(path.join(__dirname, '', './linechart.js'))
})

router.get('/v1/:currencySymbol/:startDate/:endDate/', (req, res) => {
  const { currencySymbol, startDate, endDate } = req.params;
  findCurrencyData(currencySymbol, moment(startDate), moment(endDate))
    .then(data =>  res.json({ data }));
});

router.get('*', (req, res) => {
  res.json({ message: 'this route is not supported please refer to docs!' });
});

app.use(router);
app.listen(port);

function mongoConnect() {
  return MongoClient.connect(url)
}

function getCollection(db) {
  return db.collection('currencies');
}

function findCurrencyData(symbol, start, end) {
  const db = mongoConnect();
  const currencyCollection = db.then((connectedDb) => getCollection(connectedDb));
  const targetCurrency = currencyCollection.then(res => res.find({symbol}).toArray());
  return targetCurrency.then(data => {
    const filterByDate = data.filter(currency => moment(currency.date_saved).isBetween(start, end));
    console.log(moment(currency.date_saved).isBetween(start, end))
    console.log(filterByDate)
    return Promise.resolve(filterByDate);
  })
}
