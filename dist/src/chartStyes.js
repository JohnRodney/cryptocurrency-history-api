"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = genStyles;
function genStyles() {
  return "\n    body.my-body {\n      padding: 0 !important,\n      margin: 0 !important,\n    }\n    canvas {\n      margin: 0 auto;\n      height: calc(100% - 20px) !important;\n      width: 100% !important;\n      background-color: #343434;\n      box-shadow: 0 0 10px #263238;\n    }\n    select{\n      background-color: #343434;\n      color: white;\n      padding: 20px;\n      font-size: 40px;\n      width: 200px;\n    }\n  ";
}