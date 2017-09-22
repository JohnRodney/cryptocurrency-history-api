"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = genStyles;
function genStyles() {
  return "\n    body {\n      background: url(\"https://365stockmarketnews.files.wordpress.com/2016/07/fotolia_32116767_subscription_xxl.jpg\");\n      background-size: cover;\n    }\n    canvas {\n      margin: 0 auto;\n    }\n    #bar-chart {\n      width: 100% !important;\n      margin-top: 100px;\n      height: calc(70% - 100px) !important;\n    }\n    #relative-volume {\n      margin-top: 20px;\n      float: right;\n      width: 90% !important;\n      height: calc(30% - 140px) !important;\n    }\n    #react-root{\n      top: 0;\n      left: 0;\n      height: 100%;\n      width: 100%;\n      position: absolute;\n      background-color: rgba(0, 0, 0, .6);\n    }\n\n    .percent-change-day{\n      position: absolute;\n      color: white;\n      bottom: 0;\n      pointer-events: none;\n      width: 100%;\n      height: 70px;\n      text-align: center;\n      background: white;\n      font-size: 40;\n    }\n    .relative-volume-label {\n      position: absolute;\n      top: 72.5%;\n      left: 0;\n      color: white;\n      background-color: rgba(43, 135, 218, .7);\n      height: 30px;\n      padding: 20px;\n      width: calc(10% - 26px);\n      font-size: 16px;\n      text-align: center;\n    }\n    .tool-bar {\n      text-align: center;\n      width: 100%;\n      height: 90px;\n      background: #2b87da;\n      position: absolute;\n      top: 0;\n      padding: 20px;\n      box-sizing: border-box;\n    }\n    .tool-bar select{\n      color: white;\n      background: #2b87da;\n      border: 2px solid white;\n      font-size: 33px;\n      padding: 5px;\n      outline: none;\n      display: inline;\n      vertical-align: middle;\n    }\n    .percent-change-day p {\n      font-size: 12;\n      color: black;\n      margin: 0;\n      padding: 0;\n    }\n    .green {\n      color: #90ff90;\n    }\n    .red {\n      color: #c62828;\n    }\n    .is-hidden {\n      visibility: hidden;\n    }\n    .pika-single {\n      padding: 20px;\n      background: white;\n      min-width: 300px;\n    }\n    .pika-single table {\n      width: 300px;\n    }\n    abbr[title] {\n      text-decoration: none;\n      padding-bottom: 10px;\n    }\n    .pika-button {\n      background: #2b87da;\n      color: white;\n      outline: none;\n      border: none;\n      width: calc(100% - 2px);\n      margin-bottom: 2px;\n    }\n    .pika-button:hover{\n      background: #efefef;\n      color: #2b87da;\n    }\n    .pika-select {\n      background: #2b87da;\n      float: right;\n      color: white;\n      outline: none;\n    }\n    .pika-prev, .pika-next{\n      background: #2b87da;\n      color: white;\n      width: 45%;\n      margin: 2.5%;\n      border: none;\n      outline: none;\n    }\n    .pika-label {\n      padding: 5px;\n    }\n    .tool-bar input {\n      display: inline;\n      vertical-align: middle;\n      font-size: 20px;\n      padding: 10px;\n      margin: 0 20px 0 20px;\n    }\n    .go {\n      display: inline;\n      vertical-align: middle;\n      background: #2bda87;\n      padding: 12px;\n      font-size: 20px;\n      color: white;\n      border: 0;\n      outline: none;\n      cursor: pointer;\n    }\n  ";
}