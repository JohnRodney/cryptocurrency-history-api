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
      showMenu: false,
      start: moment(start),
      end: moment(end),
      symbol: symbol,
      historyData: [],
      relativeVolume: 0,
      status: 'needs-data'
    };
    _this.handleResponse = _this.handleResponse.bind(_this);
    return _this;
  }

  _createClass(BarChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      ['start', 'end'].forEach(function (id) {
        return _this2.datePicker(id);
      });
    }
  }, {
    key: 'datePicker',
    value: function datePicker(id) {
      var _this3 = this;

      this[id] = new Pikaday({
        field: document.getElementById(id),
        onSelect: function onSelect(date) {
          return _this3.setState(Object.assign({ status: 'needs-data', showMenu: false }, id === 'start' ? { start: moment(date) } : { end: moment(date) }));
        },
        defaultDate: this.state[id].toDate()
      });
    }
  }, {
    key: 'updateChart',
    value: function updateChart(id, type, data, options) {
      var target = document.getElementById(id);
      if (target && data) {
        var ctx = target.getContext('2d');
        if (this[type]) {
          this[type].destroy();
        }
        this[type] = new Chart(ctx, { type: type, data: data, options: options });
      }
    }
  }, {
    key: 'getHorizontalBarData',
    value: function getHorizontalBarData() {
      return {
        datasets: [{
          data: [this.state.relativeVolume],
          backgroundColor: 'rgba(0, 200, 100, 0.5)',
          borderColor: 'rgba(0, 200, 100, 1)',
          borderWidth: 20,
          pointRadius: 0
        }]
      };
    }
  }, {
    key: 'updateCharts',
    value: function updateCharts() {
      var data = this.state.historyData;
      this.updateChart('bar-chart', 'financial', this.getChartData(data.map(function (d) {
        return d.date;
      }), data.map(function (d) {
        return d.price;
      })), barChartOptions);
      this.updateChart('relative-volume', 'horizontalBar', this.getHorizontalBarData(), volumeChartOptions);
    }
  }, {
    key: 'render',
    value: function render() {
      var status = this.state.status;

      var loading = status === 'needs-data' ? this.renderLoading() : '';
      ({ 'needs-data': this.getData, 'update-charts': this.updateCharts })[status].call(this);

      return React.createElement(
        'div',
        { className: 'bar-char-root' },
        loading,
        this.renderToolBar(),
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
    key: 'renderLoading',
    value: function renderLoading() {
      return React.createElement(
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
    }
  }, {
    key: 'renderToolBar',
    value: function renderToolBar() {
      var _this4 = this;

      return React.createElement(
        'div',
        { className: 'tool-bar' },
        React.createElement(
          'button',
          {
            className: 'c-hamburger c-hamburger--htx ' + (this.state.showMenu ? 'is-active' : ''),
            onClick: function onClick(e) {
              return _this4.setState({ showMenu: !_this4.state.showMenu });
            }
          },
          React.createElement('span', null)
        ),
        React.createElement(
          'div',
          { className: 'collapsable-menu  ' + (this.state.showMenu ? 'show' : 'hide') },
          React.createElement(
            'select',
            {
              className: 'symbols',
              defaultValue: window.location.pathname.split('/')[4],
              onChange: function onChange(e) {
                _this4.setState({ symbol: e.target.value, status: 'needs-data' });
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
          React.createElement('input', { type: 'text', id: 'end', value: this.state.end.format('YYYY-MM-DD') })
        )
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
      var origin = window.location.origin;
      var _state = this.state,
          start = _state.start,
          end = _state.end,
          symbol = _state.symbol;

      var urlEnd = symbol + '/' + start.toISOString() + '/' + end.toISOString() + '/';
      history.replaceState({}, "", '/v1/chart/bar/' + urlEnd);
      $.get(origin + '/v1/' + urlEnd, this.handleResponse);
    }
  }, {
    key: 'handleResponse',
    value: function handleResponse(response) {
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
      var dayChange = data[data.length - 1].percent_change_24h ? data.pop().percent_change_24h : 0;
      this.setState({ historyData: historyData, relativeVolume: relativeVolume, dayChange: dayChange, status: 'update-charts' });
    }
  }]);

  return BarChart;
}(React.Component);

$(document).ready(function () {
  ReactDOM.render(React.createElement(BarChart, null), document.getElementById('react-root'));
});

var volumeChartOptions = {
  tooltips: { enabled: false },
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