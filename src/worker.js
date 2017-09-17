import { MongoClient } from 'mongodb';
import rp from 'request-promise';
import moment from 'moment';

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/myproject';

const options = {
  uri: 'https://api.coinmarketcap.com/v1/ticker/',
  headers: { 'User-Agent': 'Request-Promise' },
  json: true,
};

function getCurrencies(db) {
  return rp(options)
    .then(currencies => batchUpsert(db, addDates(currencies)))
    .catch(err => console.warn("There was a problem getting the currency ticker data err is:", err));
}

function batchUpsert(db, currencies) {
  const currencyCollection = db.collection('currencies');
  return currencyCollection.insertMany(currencies)
    .then(res => db.close())
    .catch(err => Promise.resolve(console.warn('err inserting documents', err)));
}

function addDates(currencies) {
  return currencies.map(currency => {
    const currencyCopy = currency;
    currencyCopy.date_saved = moment().toISOString();
    return currencyCopy;
  });
}

const db = MongoClient.connect(url);

db.then((db) => getCurrencies(db))
  .catch(err => Promise.resolve(console.log(err)));

