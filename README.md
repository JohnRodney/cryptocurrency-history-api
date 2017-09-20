# cryptocurrency-history-api
This is a node.js application with a mongo DB that will expose a JSON api for
searching for the history of market prices in the cryptocurrency market.  At the
time of creation there were no available free APIs for getting history on large
sets of cryptocurrency.

This project is currenty in the planning phases and as such the readme will
reflect that until the work is to a level that documentation can be created.

# Why?
There is a growing demand for the need to display data in different ways about
the cryptocurrency market.  Unfortunately there is no centralized way to get
data on any given currency over any given date-range in order to display charts
ect.

# Plans
The api should have a qued service worker that will poll the entire currency
market at 5 minute intervals using the external api at https://api.coinmarketcap.com/v1/ticker/
This data will then be stored in a Mongo database with a timestamp of the market
price.

Once the worker thread is done and working the next step should be exposing a
consumable api.  The following are the rough draft plans for the API.

`apiurl/v1/currencySymbol/startDate/endDate`

`apiurl/v1/chart/line/currencySymbol/startDate/endDate`

CurrencySymbol should be the symbol of the cryptocurrency such as BTC for
bitcoin
The dates will be in ISO standard format.  If no dates are given then the api
should default to 1 week ago to now as the date range providing a week's worth
of data for the chosen currency.

## ex request:

`GET [apiurl]/v1/BTC/2017-09-10T14:30:25.860Z/2017-09-17T14:30:07.256Z/`

## HTML Page that renders a chart NOT a json endpoint
`GET [apiurl]/v1/chart/line/BTC/2017-09-10T14:30:25.860Z/2017-09-17T14:30:07.256Z/`

I highly suggest using moment().toISOString() for consctructing the dates on
your request as it will be moment doing the parsing.
