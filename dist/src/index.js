'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _routes = require('./settings/routes');

var _routes2 = _interopRequireDefault(_routes);

var _port = require('./settings/port');

var _port2 = _interopRequireDefault(_port);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var router = _express2.default.Router();

Object.keys(routeHash).forEach(function (route) {
  return router.get(route, routeHash[route]);
});

app.use(router);
app.listen(_port2.default);