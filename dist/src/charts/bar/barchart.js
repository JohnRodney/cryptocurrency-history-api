'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* File is meant to be self evoking on the client side after
 * delivered to the front end browser. No imports are valid here */
var _Coinstaker$Config = Coinstaker.Config,
    barChartOptions = _Coinstaker$Config.barChartOptions,
    symbol = _Coinstaker$Config.symbol,
    start = _Coinstaker$Config.start,
    end = _Coinstaker$Config.end;
var origin = window.location.origin;

var url = origin + '/v1/' + symbol + '/' + start + '/' + end + '/';

Chart.defaults.financial = Chart.defaults.bar;

var custom = Chart.controllers.bar.extend({
  draw: function draw(ease) {
    $('canvas').css('background', '#000035');
    // Now we can do some custom drawing for this dataset. Here we'll draw a red box around the first point in each dataset
    var meta = this.getMeta();
    var pt0 = meta.data;

    var ctx = this.chart.chart.ctx;
    meta.data.forEach(function (data, i) {
      var step = parseInt(meta.data.length / 50);

      if (i % step === 0) {
        var startX = data._model.x;
        var startY = data._model.y;
        var nextX = i <= meta.data.length - step - 3 ? meta.data[i + step]._model.x : startX;
        var nextY = i <= meta.data.length - step - 3 ? meta.data[i + step]._model.y : startY;
        var width = Math.abs(nextX - startX - 4);
        var height = nextY - startY;
        height = height < 2 && height >= 0 ? 2 : height;
        height = height <= 0 && height > -2 ? -2 : height;
        ctx.save();
        ctx.fillStyle = height >= 0 ? 'rgba(255, 100, 100, 1)' : 'rgba(0, 200, 100, 1)';
        ctx.lineWidth = 1;
        ctx.fillRect(startX, startY, width, height);
        ctx.restore();
      }
    });
  }
});

Chart.controllers.financial = custom;

var lineChart = function () {
  function lineChart() {
    _classCallCheck(this, lineChart);
  }

  _createClass(lineChart, [{
    key: 'render',
    value: function render(data) {
      var ctx = document.getElementById("myChart").getContext('2d');

      return new Chart(ctx, {
        type: 'financial',
        data: this.getChartData(data.map(function (d) {
          return d.date;
        }), data.map(function (d) {
          return d.price;
        })),
        options: barChartOptions
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