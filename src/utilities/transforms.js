export function addDates(currencies) {
  return currencies.map(currency => {
    const currencyCopy = currency;
    currencyCopy.date_saved = moment().toISOString();
    return currencyCopy;
  });
}
