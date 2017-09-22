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
    end = _Coinstaker$Config.end,
    symbols = _Coinstaker$Config.symbols;
var origin = window.location.origin;

var url = origin + '/v1/' + symbol + '/' + start + '/' + end + '/';

/* TODO figure out how to write a function from an object method
 *   into a template string then this can be migrated to settings
 *   *  */
barChartOptions.tooltips.custom = function (toolTips) {
  toolTips.xPadding = 50;
  toolTips.yPadding = 60;
  toolTips.height = 250;
  toolTips.width = 350;
  toolTips.titleMarginBottom = 50;
  toolTips.titleFontSize = 22;
  toolTips.bodyFontSize = 40;
  toolTips.displayColors = false;
  toolTips.backgroundColor = 'white';
  toolTips.titleFontColor = 'black';
  toolTips.bodyFontColor = 'black';
  if (toolTips.title && toolTips.title[0] && toolTips.body && toolTips.body[0]) {
    var date = moment.unix(+toolTips.title[0]);
    toolTips.title[0] = date.format("MMMM Do YYYY");
    toolTips.body[0].lines[0] = '$' + parseFloat(toolTips.body[0].lines[0]);
  }
};

var BarChart = function (_React$Component) {
  _inherits(BarChart, _React$Component);

  function BarChart() {
    _classCallCheck(this, BarChart);

    var _this = _possibleConstructorReturn(this, (BarChart.__proto__ || Object.getPrototypeOf(BarChart)).call(this));

    _this.state = {
      start: moment(start),
      end: moment(end),
      symbol: symbol,
      historyData: [],
      relativeVolume: 0,
      status: 'needs-data'
    };
    return _this;
  }

  _createClass(BarChart, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getData();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var start = new Pikaday({
        field: document.getElementById('start'),
        onSelect: function onSelect(start) {
          return _this2.setState({ start: moment(start), status: 'needs-data' });
        },
        defaultDate: this.state.start.toDate()
      });
      var end = new Pikaday({
        field: document.getElementById('end'),
        onSelect: function onSelect(end) {
          return _this2.setState({ end: moment(end), status: 'needs-data' });
        },
        defaultDate: this.state.end.toDate()
      });
    }
  }, {
    key: 'updateChart',
    value: function updateChart() {
      var barChart = document.getElementById("bar-chart");
      var data = this.state.historyData;
      if (barChart && data) {
        console.log('updating fincancial');
        var ctx = barChart.getContext('2d');
        if (this.financial) {
          this.financial.destroy();
        }
        this.financial = new Chart(ctx, {
          type: 'financial',
          data: this.getChartData(data.map(function (d) {
            return d.date;
          }), data.map(function (d) {
            return d.price;
          })),
          options: barChartOptions
        });
      }

      var rvChart = document.getElementById("relative-volume");
      if (rvChart) {
        var _ctx = rvChart.getContext('2d');
        if (this.rv) {
          this.rv.destroy();
        }
        this.rv = new Chart(_ctx, {
          type: 'horizontalBar',
          data: {
            datasets: [{
              data: [this.state.relativeVolume],
              backgroundColor: 'rgba(0, 200, 100, 0.5)',
              borderColor: 'rgba(0, 200, 100, 1)',
              borderWidth: 20,
              pointRadius: 0
            }]
          },
          options: volumeChartOptions
        });
      }
    }
  }, {
    key: 'gotoNewChart',
    value: function gotoNewChart() {
      var _state = this.state,
          symbol = _state.symbol,
          start = _state.start,
          end = _state.end;

      window.location = window.location.origin + '/v1/chart/bar/' + symbol + '/' + start.toISOString() + '/' + end.toISOString() + '/';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var loading = '';
      if (this.state.status === 'needs-data') {
        console.log('needs data');
        loading = React.createElement(
          'div',
          { className: 'sk-cube-grid' },
          React.createElement('div', { className: 'sk-cube sk-cube1' }),
          React.createElement('div', { className: 'sk-cube sk-cube2' }),
          React.createElement('div', { className: 'sk-cube sk-cube3' }),
          React.createElement('div', { className: 'sk-cube sk-cube4' }),
          React.createElement('div', { className: 'sk-cube sk-cube5' }),
          React.createElement('div', { className: 'sk-cube sk-cube6' }),
          React.createElement('div', { className: 'sk-cube sk-cube7' }),
          React.createElement('div', { className: 'sk-cube sk-cube8' }),
          React.createElement('div', { className: 'sk-cube sk-cube9' })
        );
        this.getData();
      } else if (this.state.status === 'update-charts') {
        console.log('update -charts');
        this.updateChart();
      }
      return React.createElement(
        'div',
        { className: 'bar-char-root' },
        loading,
        React.createElement(
          'div',
          { className: 'tool-bar' },
          React.createElement(
            'select',
            {
              className: 'symbols',
              defaultValue: window.location.pathname.split('/')[4],
              onChange: function onChange(e) {
                _this3.setState({ symbol: e.target.value, status: 'needs-data' });
              }
            },
            symbols.map(function (sym, i) {
              return React.createElement(
                'option',
                { key: sym + i, value: sym },
                sym
              );
            })
          ),
          React.createElement('input', { type: 'text', id: 'start', value: this.state.start.format('YYYY-MM-DD') }),
          React.createElement('input', { type: 'text', id: 'end', value: this.state.end.format('YYYY-MM-DD') }),
          React.createElement(
            'button',
            {
              className: 'go',
              onClick: function onClick(e) {
                return _this3.gotoNewChart();
              }
            },
            'GO'
          )
        ),
        React.createElement(
          'div',
          { className: 'percent-change-day ' + (this.state.dayChange >= 0 ? 'green' : 'red') },
          '(',
          this.state.dayChange,
          '%)',
          React.createElement(
            'p',
            null,
            '24hr change'
          )
        ),
        React.createElement(
          'div',
          { className: 'relative-volume-label' },
          'Relative Volume'
        ),
        React.createElement('canvas', { id: 'bar-chart', width: '400', height: '400' }),
        React.createElement('canvas', { id: 'relative-volume', width: '400', height: '400' })
      );
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
      var _this4 = this;

      var origin = window.location.origin;
      var _state2 = this.state,
          start = _state2.start,
          end = _state2.end,
          symbol = _state2.symbol;

      history.replaceState({}, "", '/v1/chart/bar/' + symbol + '/' + start.toISOString() + '/' + end.toISOString() + '/');
      console.log('asking for more', this.state.historyData, '' + origin);
      $.get(origin + '/v1/' + symbol + '/' + start.toISOString() + '/' + end.toISOString() + '/', function (response) {
        var data = response.data;

        var historyData = data.map(function (d) {
          return { date: moment(d.date_saved).unix(), price: d.price_usd };
        });
        var volumes = data.map(function (data) {
          return data["24h_volume_usd"];
        });
        var relativeVolume = volumes[0] / (volumes.reduce(function (acc, nxt) {
          return +acc + +nxt;
        }, 0) / volumes.length);
        var dayChange = data.pop().percent_change_24h;
        console.log(historyData);
        _this4.setState({ historyData: historyData, relativeVolume: relativeVolume, dayChange: dayChange, status: 'update-charts' });
      });
    }
  }]);

  return BarChart;
}(React.Component);

$(document).ready(function () {
  ReactDOM.render(React.createElement(BarChart, null), document.getElementById('react-root'));
});

var volumeChartOptions = {
  tooltips: {
    enabled: false
  },
  responsive: 'true',
  legend: { display: false },
  scaleFontColor: "#FFFFFF",
  scales: {
    scaleLabel: {
      fontColor: 'yellow',
      fontSize: '30'
    },
    yAxes: [{
      display: true,
      gridLines: { color: "white" }
    }],
    xAxes: [{
      display: true,
      gridLines: { color: "rgba(255, 255, 255, 0)" },
      ticks: { fontSize: 0, min: 0.0, suggestedMax: 2.0, stepSize: 0.5, fontColor: 'white', padding: 50 }
    }]
  }
};