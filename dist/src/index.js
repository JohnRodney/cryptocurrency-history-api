'use strict';

var _mongodb = require('mongodb');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _chartTemplate = require('./chartTemplate');

var _chartTemplate2 = _interopRequireDefault(_chartTemplate);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/myproject';
var router = _express2.default.Router();
var port = process.env.PORT || 8080;

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
router.get('/v1/chart/line/:currencySymbol/:startDate/:endDate/', function (req, res) {
  var _req$params = req.params,
      currencySymbol = _req$params.currencySymbol,
      startDate = _req$params.startDate,
      endDate = _req$params.endDate;

  res.send((0, _chartTemplate2.default)(currencySymbol, startDate, endDate));
});

router.get('/linechart.js', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '', './linechart.js'));
});

router.get('/v1/:currencySymbol/:startDate/:endDate/', function (req, res) {
  var _req$params2 = req.params,
      currencySymbol = _req$params2.currencySymbol,
      startDate = _req$params2.startDate,
      endDate = _req$params2.endDate;

  findCurrencyData(currencySymbol, (0, _moment2.default)(startDate), (0, _moment2.default)(endDate)).then(function (data) {
    return res.json({ data: data });
  });
});

router.get('*', function (req, res) {
  res.json({ message: 'this route is not supported please refer to docs!' });
});

app.use(router);
app.listen(port);

function mongoConnect() {
  return _mongodb.MongoClient.connect(url);
}

function getCollection(db) {
  return db.collection('currencies');
}

function findCurrencyData(symbol, start, end) {
  var db = mongoConnect();
  var currencyCollection = db.then(function (connectedDb) {
    return getCollection(connectedDb);
  });
  var targetCurrency = currencyCollection.then(function (res) {
    return res.find({ symbol: symbol }).toArray();
  });
  return targetCurrency.then(function (data) {
    var filterByDate = data.filter(function (currency) {
      return (0, _moment2.default)(currency.date_saved).isBetween(start, end);
    });
    return Promise.resolve(filterByDate);
  });
}