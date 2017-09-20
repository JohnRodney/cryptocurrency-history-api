'use strict';

var _mongodb = require('mongodb');

var _devmongo = require('../settings/devmongo');

var _devmongo2 = _interopRequireDefault(_devmongo);

var _mongo = require('./utilities/mongo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongodb.MongoClient.connect(_devmongo2.default).then(function (db) {
  return (0, _mongo.getCurrencies)(db);
}).catch(function (err) {
  return Promise.resolve(console.log(err));
});