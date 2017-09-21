import webshot from 'webshot';
import symbols from './fixtures/symbols';
import webshotOptions from './settings/webshot-options';
import { getURL, getPath } from './utilities/getUrlFromSym';

let count = 0;
const err = (next, res) => ((err) => res(console.log(err, next, ++count)));
const snapshot = (next) =>
  ((res, rej) => webshot(getURL(next), getPath(next), webshotOptions, err(next, res)));

symbols.reduce(
  (acc, next) => acc.then(() => new Promise(snapshot(next))),
  Promise.resolve()
).catch(err(null));
