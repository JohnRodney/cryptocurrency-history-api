import webshot from 'webshot';
import symbols from './fixtures/symbols';
import webshotOptions from './settings/webshot-options';
import { getURL, getPath } from './utilities/getUrlFromSym';

let count = 0;
/* Catch the error and report the error count and symbol if the call to URL
 * fails to screenshot */
const err = (next, res) => ((err) => res(console.log(err, next, ++count)));
/* Perform the screenshot generating a url and path from the symbol
 *   webshot spins up phantomjs and takes an image of the chart then saves it
 *   to the server's public directory */
const snapshot = (next) =>
  ((res, rej) => webshot(getURL(next), getPath(next), webshotOptions, err(next, res)));

/* Iterate over the array of symbols and take a screenshot and save an image for each one */
symbols.reduce((acc, next) => acc.then(() => new Promise(snapshot(next))), Promise.resolve())
  .catch(err(null));
