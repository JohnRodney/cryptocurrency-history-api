"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = genStyles;
function genStyles() {
  return "\n    body {\n        font: 12px Arial;\n    }\n    path {\n        stroke: steelblue;\n        stroke-width: 2;\n        fill: none;\n    }\n    canvas {\n      margin: 30px auto;\n      height: 500px !important;\n      width: 100% !important;\n      background-color: #343434;\n      box-shadow: 0 0 10px #263238;\n    }\n    select{\n      background-color: #343434;\n      color: white;\n      padding: 20px;\n      font-size: 40px;\n      width: 200px;\n    }\n  ";
}