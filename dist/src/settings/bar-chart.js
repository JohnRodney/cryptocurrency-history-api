"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  legend: { display: false },
  scaleFontColor: "#FFFFFF",
  tooltips: {
    enabled: true
  },
  scales: {
    xAxes: [{
      display: false,
      gridLines: { color: "rgba(0, 0, 0, .5)" },
      ticks: {
        fontSize: 20,
        fontColor: 'white'
      }
    }],
    yAxes: [{
      gridLines: { color: "rgba(0, 189, 255, .0)" },
      ticks: {
        maxTicksLimit: 7,
        fontSize: 30,
        stepSize: '50%',
        fontColor: 'white',
        padding: 40 }
    }]
  }
};