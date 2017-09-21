"use strict";

!function e(t, a, n) {
  function l(r, o) {
    if (!a[r]) {
      if (!t[r]) {
        var s = "function" == typeof require && require;if (!o && s) return s(r, !0);if (i) return i(r, !0);var c = new Error("Cannot find module '" + r + "'");throw c.code = "MODULE_NOT_FOUND", c;
      }var d = a[r] = { exports: {} };t[r][0].call(d.exports, function (e) {
        var a = t[r][1][e];return l(a || e);
      }, d, d.exports, e, t, a, n);
    }return a[r].exports;
  }for (var i = "function" == typeof require && require, r = 0; r < n.length; r++) {
    l(n[r]);
  }return l;
}({ 1: [function (e, t, a) {}, {}], 2: [function (e, t, a) {
    "use strict";
    Chart.helpers;t.exports = function (e) {
      e.defaults.financial = { label: "", hover: { mode: "label" }, scales: { xAxes: [{ type: "time", distribution: "series", categoryPercentage: .8, barPercentage: .9, time: { format: "ll" }, ticks: { source: "data" } }], yAxes: [{ type: "financialLinear" }] }, tooltips: { callbacks: { label: function label(e, t) {
              return " O " + t.datasets[e.datasetIndex].data[e.index].o + " H " + t.datasets[e.datasetIndex].data[e.index].h + " L " + t.datasets[e.datasetIndex].data[e.index].l + " C " + t.datasets[e.datasetIndex].data[e.index].c;
            } } } }, e.controllers.financial = e.controllers.bar.extend({ dataElementType: e.elements.Candlestick, updateElement: function updateElement(e, t, a) {
          var n = this,
              l = (n.chart, n.getMeta()),
              i = n.getDataset();e.custom;e._xScale = n.getScaleForId(l.xAxisID), e._yScale = n.getScaleForId(l.yAxisID), e._datasetIndex = n.index, e._index = t, e._model = { datasetLabel: i.label || "", upCandleColor: i.upCandleColor, downCandleColor: i.downCandleColor, outlineCandleColor: i.outlineCandleColor, outlineCandleWidth: i.outlineCandleWidth }, n.updateElementGeometry(e, t, a), e.pivot();
        }, updateElementGeometry: function updateElementGeometry(e, t, a) {
          var n = this,
              l = e._model,
              i = n.getValueScale(),
              r = i.getBasePixel(),
              o = i.isHorizontal(),
              s = n._ruler || n.getRuler(),
              c = n.calculateBarValuePixels(n.index, t),
              d = n.calculateBarIndexPixels(n.index, t, s);l.horizontal = o, l.base = a ? r : c.base, l.x = o ? a ? r : c.head : d.center, l.y = o ? d.center : a ? r : c.head, l.height = o ? d.size : void 0, l.width = o ? void 0 : d.size, l.candle = n.calculateCandleValuesPixels(n.index, t);
        }, calculateCandleValuesPixels: function calculateCandleValuesPixels(e, t) {
          var a = this,
              n = a.chart,
              l = a.getValueScale(),
              i = n.data.datasets;return { o: l.getPixelForValue(Number(i[e].data[t].o)), h: l.getPixelForValue(Number(i[e].data[t].h)), l: l.getPixelForValue(Number(i[e].data[t].l)), c: l.getPixelForValue(Number(i[e].data[t].c)) };
        }, draw: function draw() {
          var t,
              a = this.chart.chart.ctx,
              n = this.getMeta().data,
              l = this.getDataset(),
              i = n.length,
              r = 0;for (e.canvasHelpers.clipArea(a, this.chart.chartArea); r < i; ++r) {
            null === (t = l.data[r].o) || void 0 === t || isNaN(t) || n[r].draw();
          }e.canvasHelpers.unclipArea(a);
        } });
    };
  }, {}], 3: [function (e, t, a) {
    "use strict";
    t.exports = function (e) {
      function t(e) {
        return void 0 !== e._view.width;
      }function a(e) {
        var t,
            a,
            n,
            l,
            i = e._view,
            r = i.width / 2;return t = i.x - r, a = i.x + r, n = i.candle.h, l = i.candle.l, { left: t, top: n, right: a, bottom: l };
      }var n = e.helpers,
          l = e.defaults.global;l.defaultColor;l.elements.candlestick = { upCandleColor: "rgba(80, 160, 115, 1)", downCandleColor: "rgba(215, 85, 65, 1)", outlineCandleColor: "rgba(90, 90, 90, 1)", outlineCandleWidth: 1 }, e.elements.Candlestick = e.Element.extend({ draw: function draw() {
          var e = this._chart.ctx,
              t = this._view,
              a = (t.borderWidth, t.x),
              i = t.candle.o,
              r = t.candle.h,
              o = t.candle.l,
              s = t.candle.c;e.strokeStyle = n.getValueOrDefault(t.outlineCandleColor, l.elements.candlestick.outlineCandleColor), e.lineWidth = n.getValueOrDefault(t.outlineCandleWidth, l.elements.candlestick.outlineCandleWidth), e.fillStyle = s < i ? n.getValueOrDefault(t.upCandleColor, l.elements.candlestick.upCandleColor) : s > i ? n.getValueOrDefault(t.downCandleColor, l.elements.candlestick.downCandleColor) : n.getValueOrDefault(t.outlineCandleColor, l.elements.candlestick.outlineCandleColor), e.beginPath(), e.moveTo(a, r), e.lineTo(a, o), e.stroke(), e.fillRect(a - t.width / 2, s, t.width, i - s), e.strokeRect(a - t.width / 2, s, t.width, i - s), e.closePath();
        }, height: function height() {
          var e = this._view;return e.base - e.y;
        }, inRange: function inRange(e, t) {
          var n = !1;if (this._view) {
            var l = a(this);n = e >= l.left && e <= l.right && t >= l.top && t <= l.bottom;
          }return n;
        }, inLabelRange: function inLabelRange(e, n) {
          var l = this;if (!l._view) return !1;var i = a(l);return t(l) ? e >= i.left && e <= i.right : n >= i.top && n <= i.bottom;
        }, inXRange: function inXRange(e) {
          var t = a(this);return e >= t.left && e <= t.right;
        }, inYRange: function inYRange(e) {
          var t = a(this);return e >= t.top && e <= t.bottom;
        }, getCenterPoint: function getCenterPoint() {
          var e,
              t,
              a = this._view,
              n = a.width / 2;return e = a.x - n, t = (a.candle.h + a.candle.l) / 2, { x: e, y: t };
        }, getArea: function getArea() {
          var e = this._view;return e.width * Math.abs(e.y - e.base);
        }, tooltipPosition: function tooltipPosition() {
          var e = this._view;return { x: e.x, y: (e.candle.h + e.candle.l) / 2 };
        } });
    };
  }, {}], 4: [function (e, t, a) {
    "use strict";
    var n = e("chart.js");n = "function" == typeof n ? n : window.Chart, e("./element.candlestick.js")(n), e("./scale.financialLinear.js")(n), e("./controller.financial.js")(n);
  }, { "./controller.financial.js": 2, "./element.candlestick.js": 3, "./scale.financialLinear.js": 5, "chart.js": 1 }], 5: [function (e, t, a) {
    "use strict";
    t.exports = function (e) {
      var t = e.helpers,
          a = { position: "left", ticks: { callback: function callback(e, a, n) {
            var l = n.length > 3 ? n[2] - n[1] : n[1] - n[0];Math.abs(l) > 1 && e !== Math.floor(e) && (l = e - Math.floor(e));var i = t.log10(Math.abs(l)),
                r = "";if (0 !== e) {
              var o = -1 * Math.floor(i);o = Math.max(Math.min(o, 20), 0), r = e.toFixed(o);
            } else r = "0";return r;
          } } },
          n = e.scaleService.getScaleConstructor("linear").extend({ determineDataLimits: function determineDataLimits() {
          function e(e) {
            return i ? e.xAxisID === a.id : e.yAxisID === a.id;
          }var a = this,
              n = a.chart,
              l = n.data.datasets,
              i = a.isHorizontal();a.min = null, a.max = null, t.each(l, function (l, i) {
            var r = n.getDatasetMeta(i);n.isDatasetVisible(i) && e(r) && t.each(l.data, function (e, t) {
              var n = e.h,
                  l = e.l;null === a.min ? a.min = l : l < a.min && (a.min = l), null === a.max ? a.max = n : n > a.max && (a.max = n);
            });
          }), a.min = a.min - .05 * a.min, a.max = a.max + .05 * a.max, this.handleTickRangeOptions();
        } });e.scaleService.registerScaleType("financialLinear", n, a);
    };
  }, {}] }, {}, [4]);