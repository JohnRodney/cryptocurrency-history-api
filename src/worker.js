import { MongoClient } from 'mongodb';
import { getCurrencies } from './utilities/mongo';
import devMongoURI from '../settings/devmongo';

MongoClient.connect(devMongoURI)
  .then((db) => getCurrencies(db))
  .catch(err => Promise.resolve(console.log(err)));
