"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var getPath = exports.getPath = function getPath(sym) {
  return "./dist/src/line-charts/" + sym + ".png";
};
var getURL = exports.getURL = function getURL(sym) {
  return "https://currency-history-api.herokuapp.com/v1/chart/line/\n   " + sym + "/2017-09-10T14:30:25.860Z/2017-09-20T20:30:07.256Z/";
};