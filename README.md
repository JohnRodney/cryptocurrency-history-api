# Sponsored By
![Coinstaker logo](https://www.coinstaker.com/wp-content/uploads/2016/04/coinstakerlogo3smaller.png)

The making and production of this api was sponsored by https://www.coinstaker.com/

# cryptocurrency-history-api
#### Server: `express`
#### DB: `mongo`
#### DFormat: `JSON`

# Get History JSON
`GET [apiurl]/v1/BTC/2017-09-10T14:30:25.860Z/2017-09-17T14:30:07.256Z/`
##### ex request with jQuery and moment
```javascript
const symbol = "BTC"
const start = moment().add(-7, 'days').toISOString();
const end = moment().toISOString();
const url =`https://currency-history-api.herokuapp.com/v1/${symbol}/${start}/${end}/`;

jQuery.get(url, (history) => {
  // Do something with your history
  console.log(history.data)
});
```
##### ex Response
A response will be an array of objects such as the following
```javascript
{
   "_id":"59be92bfc632a521375ab3e7",
   "id":"bitcoin",
   "name":"Bitcoin",
   "symbol":"BTC",
   "rank":"1",
   "price_usd":"3567.45",
   "price_btc":"1.0",
   "24h_volume_usd":"1281670000.0",
   "market_cap_usd":"59119246283.0",
   "available_supply":"16571850.0",
   "total_supply":"16571850.0",
   "percent_change_1h":"-0.58",
   "percent_change_24h":"0.08",
   "percent_change_7d":"-12.92",
   "last_updated":"1505661265",
   "date_saved":"2017-09-17T15:20:31.887Z"
}
```
# History Charts
`GET [apiurl]/v1/chart/line/:symbol/:start/:end/`

![Check it out](https://currency-history-api.herokuapp.com/v1/chart/line/BTC/2017-09-10T14:30:25.860Z/2017-09-20T21:30:07.256Z/)

![Example Chart](https://currency-history-api.herokuapp.com/v1/chart/line/preview/)

`GET [apiurl]/v1/chart/bar/:symbol/:start/:end/`

https://currency-history-api.herokuapp.com/v1/bar/line/BTC/2017-09-10T14:30:25.860Z/2017-09-20T21:30:07.256Z/

![Example Chart](https://currency-history-api.herokuapp.com/v1/chart/bar/preview/)


# History Chart thumnail img
![Example Chart](https://currency-history-api.herokuapp.com/v1/chart/line/thumbnail/BTC/)

`GET [apiurl]/v1/chart/line/thumbnail/:symbol/`
##### ex use in html
```javascript
  <img src="https://currency-history-api.herokuapp.com/v1/chart/line/thumbnail/BTC/">
```

# Scripts / Workers
| Name | Desccription |
|-|:-|
| npm run dev-compiler | runs a `babel` compile watcher and builds to `dist/` for development.
| npm run dev-server | runs a `forever` watcher and keeps your server up.
| npm run start-prod-worker | runs `dist/index.js` the host `express` application.
| npm run start-photographer | runs `webshot` to snap pictures of chart history,
| start | for launching the application on deploy

## Running locally
`git clone https://github.com/JohnRodney/cryptocurrency-history-api`

`cd currency-history-api`

`brew install mongodb && npm install -g forever babel && npm install`

`cd ~/ && mkdir data && mongod --dbpath=./data --port 27017`

Open a new shell and go back to the directory you cloned currency-history-api
into

In one terminal `npm run dev-compiler`

In another `npm run dev-server`

Finally you can run a thread in another terminal to start filling your db
`npm run start-prod-worker`

#### A little while later ...
After you have some data run `npm run start-photographer` to generate thumnails
for your thumbnail endpoints.
