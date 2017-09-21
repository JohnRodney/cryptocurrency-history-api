import rp from 'request-promise';
import { addDates } from './transforms';
import options from '../settings/market-cap';

export function getCurrencies(db) {
  return rp(options)
    .then(currencies => batchUpsert(db, addDates(currencies)))
    .catch(err => console.log("error retreiving data", err));
}

export function batchUpsert(db, currencies) {
  return db.collection('currencies')
    .insertMany(currencies)
    .then(res => db.close())
    .catch(err => Promise.resolve(console.log('error inserting documents', err)));
}
