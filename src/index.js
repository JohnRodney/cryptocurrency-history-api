import { MongoClient } from 'mongodb';
import express from 'express';
import bodyParser from 'body-parser';
import moment from 'moment';

const app = express();
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/myproject';
const router = express.Router();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    return Promise.resolve(filterByDate);
  })
}
