import { MongoClient } from 'mongodb';
import devMongoURI from '../settings/devmongo';
import { getCurrencies } from './utilities/mongo';

MongoClient.connect(devMongoURI)
  .then((db) => getCurrencies(db))
  .catch(err => Promise.resolve(console.log(err)));
