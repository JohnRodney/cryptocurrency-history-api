import { MongoClient } from 'mongodb';
import devMongoURI from '../settings/devmongo';
import moment from 'moment';

export default function findCurrencyData(symbol, start, end) {
  const byDate = (data) => data.filter(currency => moment(currency.date_saved).isBetween(start, end))

  return MongoClient.connect(devMongoURI)
    .then((connectedDb) => connectedDb.collection('currencies'))
    .then(res => res.find({symbol}).toArray())
    .then(data => new Promise((res, rej) => res(byDate(data))))
    .catch(err => console.log('error while fetching currency data', err));
}
