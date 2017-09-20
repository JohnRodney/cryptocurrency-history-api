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
            label: 'value in USD',
            data: data.map(function (d) {
              return d.price;
            }),
            backgroundColor: ['rgba(255, 255, 255, 0.2)'],
            borderColor: ['rgba(0,0,0,1)'],
            borderWidth: 3,
            lineTension: 0,
            pointRadius: 0
          }]
        },
        options: {
          scales: {
            xAxes: [{
              gridLines: {
                color: "rgba(0, 0, 0, 0)"
              }
            }],
            yAxes: [{
              gridLines: {
                color: "rgba(0, 0, 0, 0)"
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
    key: 'test',
    value: function test() {
      console.log('hi');
    }
  }, {
    key: 'addDropdown',
    value: function addDropdown() {
      var $target = $('#target');
      var currentSymbol = window.location.href.split('/')[6];
      var html = '\n      <select>\n        ' + Coinstaker.Config.symbols.map(function (sym) {
        return '<option ' + (sym === currentSymbol ? 'selected="selected"' : '') + '"value="' + sym + '">' + sym + '</option>';
      }).join('') + '\n      </select>\n    ';
      $target.html(html);
      $('select').change(function (e) {
        var targetPath = window.location.href.replace(currentSymbol, e.target.value);
        window.location = targetPath;
      });
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      this.getData();
      $(document).ready(function () {
        return _this2.addDropdown();
      });
    }
  }]);

  return lineChart;
}();

new lineChart().start();