export const getPath = sym => `./dist/src/line-charts/${sym}.png`;
export const getURL = (sym) =>
  `https://currency-history-api.herokuapp.com/v1/chart/line/
   ${sym}/2017-09-10T14:30:25.860Z/2017-09-20T20:30:07.256Z/`;
