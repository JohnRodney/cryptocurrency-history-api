'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Coinstaker$Config = Coinstaker.Config,
    lineChartOptions = _Coinstaker$Config.lineChartOptions,
    symbol = _Coinstaker$Config.symbol,
    start = _Coinstaker$Config.start,
    end = _Coinstaker$Config.end;
var origin = window.location.origin;

var url = origin + '/v1/' + symbol + '/' + start + '/' + end + '/';

var lineChart = function () {
  function lineChart() {
    _classCallCheck(this, lineChart);
  }

  _createClass(lineChart, [{
    key: 'render',
    value: function render(data) {
      var ctx = document.getElementById("myChart").getContext('2d');

      return new Chart(ctx, {
        type: 'line',
        data: this.getChartData(data.map(function (d) {
          return d.date;
        }), data.map(function (d) {
          return d.price;
        })),
        options: lineChartOptions
      });
    }
  }, {
    key: 'getChartData',
    value: function getChartData(dates, prices) {
      return {
        labels: dates,
        datasets: [{
          data: prices,
          backgroundColor: '#3f9ccd',
          borderColor: '#3f9ccd',
          borderWidth: 2,
          pointRadius: 0
        }]
      };
    }
  }, {
    key: 'getData',
    value: function getData() {
      var _this = this;

      $.get(url, function (data) {
        _this.render(data.data.map(function (d) {
          return { date: moment(d.date_saved).unix(), price: d.price_usd };
        }));
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