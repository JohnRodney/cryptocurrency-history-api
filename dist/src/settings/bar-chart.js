"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  legend: { display: false },
  scaleFontColor: "#FFFFFF",
  scales: {
    xAxes: [{
      display: false,
      gridLines: { color: "rgba(0, 0, 0, .5)" },
      ticks: { fontSize: 20 }
    }],
    yAxes: [{
      gridLines: { color: "rgba(255, 255, 255, 0.3)" },
      ticks: { fontSize: 40 }
    }]
  }
};