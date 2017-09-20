import { MongoClient } from 'mongodb';
import devMongoURI from '../settings/devmongo';
import moment from 'moment';

const url = process.env.MONGODB_URI || devMongoURI;

export default function findCurrencyData(symbol, start, end) {
  const db = MongoClient.connect(url);
  const currencyCollection = db.then((connectedDb) => connectedDb.collection('currencies'));
  const targetCurrency = currencyCollection.then(res => res.find({symbol}).toArray());
  return targetCurrency.then(data => {
    const filterByDate = data.filter(currency => {
      return moment(currency.date_saved).isBetween(start, end);
    })
    return Promise.resolve(filterByDate);
  })
}
