import { MongoClient } from 'mongodb';
import rp from 'request-promise';
import moment from 'moment';
import devMongoURI from '../settings/devmongo';
import options from './settings/market-cap';
import { getCurrencies, batchUpsert } from './utilities/mongo';

function addDates(currencies) {
  return currencies.map(currency => {
    const currencyCopy = currency;
    currencyCopy.date_saved = moment().toISOString();
    return currencyCopy;
  });
}

MongoClient.connect(devMongoURI)
  .then((db) => getCurrencies(db))
  .catch(err => Promise.resolve(console.log(err)));

