import webshot from 'webshot';
import symbols from './fixtures/symbols';

let count = 0;
symbols.reduce((acc, next) => {
  return acc.then(() => {
    return new Promise((res, rej) => {
      webshot(
        `https://currency-history-api.herokuapp.com/v1/chart/line/${next}/2017-09-10T14:30:25.860Z/2017-09-20T20:30:07.256Z/`,
        `./dist/src/line-charts/${next}.jpg`,
        {
          renderDelay: 4000,
          windowSize: {
            width: 1024 / 7.6,
            height: 768 / 7.6
          },
          shotSize: {
            width: 1024 / 7.6,
            height: 768 / 7.6
          },
          zoomFactor: 7.6,
          width: 200,
          height: 100,
        },
        (err) => res(console.log(next, ++count))
      );
    })
  })
}, Promise.resolve());
