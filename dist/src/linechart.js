'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lineChart = function () {
  function lineChart() {
    _classCallCheck(this, lineChart);
  }

  _createClass(lineChart, [{
    key: 'jsfiddle',
    value: function jsfiddle(data) {
      var ctx = document.getElementById("myChart").getContext('2d');

      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map(function (d) {
            return d.date;
          }),
          datasets: [{
            label: '# of Votes',
            data: data.map(function (d) {
              return d.price;
            }),
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
  }, {
    key: 'getData',
    value: function getData() {
      var _this = this;

      $.get(window.location.origin + '/v1/' + Coinstaker.Config.symbol + '/2017-09-10T14:30:25.860Z/2017-09-20T20:30:07.256Z/', function (data) {
        var transformed = data.data.map(function (d) {
          return {
            date: moment(d.date_saved).format('d-MM-YY'),
            price: d.price_usd
          };
        });
        _this.jsfiddle(transformed);
      });
    }
  }, {
    key: 'start',
    value: function start() {
      this.getData();
    }
  }]);

  return lineChart;
}();

new lineChart().start();