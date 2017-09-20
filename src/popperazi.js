import webshot from 'webshot';
import symbols from './fixtures/symbols';
import webshotOptions from './settings/webshot-options';
import { getURL, getPath } from './utilities/getUrlFromSym';

let count = 0;
symbols.reduce((acc, next) => {
  return acc.then(() => {
    return new Promise((res, rej) => {
      webshot(getURL(next), getPath(sym), webshotOptions, (err) => res(console.log(next, ++count)));
    })
  })
}, Promise.resolve());
