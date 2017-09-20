import webshot from 'webshot';
import symbols from './fixtures/symbols';

let count = 0;
symbols.reduce((acc, next) => {
  return acc.then(() => {
    return new Promise((res, rej) => {
      webshot(
        `https://currency-history-api.herokuapp.com/v1/chart/line/${next}/2017-09-10T14:30:25.860Z/2017-09-20T20:30:07.256Z/`,
        `./dist/src/line-charts/${next}.png`,
        {
          renderDelay: 4000,
          windowSize: {
            width: 200,
            height: 100
          },
          shotSize: {
            width: 'window',
            height: 'window'
          },
          zoomFactor: 7.6,
        },
        (err) => res(console.log(next, ++count))
      );
    })
  })
}, Promise.resolve());
