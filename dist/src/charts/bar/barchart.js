'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* File is meant to be self evoking on the client side after
 * delivered to the front end browser. No imports are valid here */
var _Coinstaker$Config = Coinstaker.Config,
    barChartOptions = _Coinstaker$Config.barChartOptions,
    symbol = _Coinstaker$Config.symbol,
    start = _Coinstaker$Config.start,
    end = _Coinstaker$Config.end;
var origin = window.location.origin;

var url = origin + '/v1/' + symbol + '/' + start + '/' + end + '/';

var BarChart = function (_React$Component) {
  _inherits(BarChart, _React$Component);

  function BarChart() {
    _classCallCheck(this, BarChart);

    var _this = _possibleConstructorReturn(this, (BarChart.__proto__ || Object.getPrototypeOf(BarChart)).call(this));

    _this.state = {
      historyData: []
    };
    return _this;
  }

  _createClass(BarChart, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getData();
    }
  }, {
    key: 'updateChart',
    value: function updateChart() {
      var canvas = document.getElementById("myChart");
      var data = this.state.historyData;
      if (canvas && data) {
        var ctx = canvas.getContext('2d');
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
    }
  }, {
    key: 'render',
    value: function render() {
      this.updateChart();

      return React.createElement('canvas', { id: 'myChart', width: '400', height: '400' });
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
      var _this2 = this;

      $.get(url, function (data) {
        console.log(data);
        var historyData = data.data.map(function (d) {
          return { date: moment(d.date_saved).unix(), price: d.price_usd };
        });
        _this2.setState({ historyData: historyData });
      });
    }
  }]);

  return BarChart;
}(React.Component);

$(document).ready(function () {
  ReactDOM.render(React.createElement(BarChart, null), document.getElementById('react-root'));
});