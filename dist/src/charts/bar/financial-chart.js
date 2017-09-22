'use strict';

Chart.defaults.financial = Chart.defaults.bar;

function drawData(price, i, data, ctx) {
  var step = parseInt(data.length / (window.innerWidth / 30));
  if (i % step === 0) {
    var startX = i === 0 ? price._model.x + 5 : price._model.x;
    var startY = price._model.y;
    var nextX = i <= data.length - step - 3 ? data[i + step]._model.x : startX;
    var nextY = i <= data.length - step - 3 ? data[i + step]._model.y : startY;
    var width = Math.abs(nextX - startX - 4);
    var height = nextY - startY;
    height = height < 2 && height >= -1 ? 1 : height;

    ctx.save();
    ctx.fillStyle = height >= 0 ? 'rgba(255, 100, 100, 0.6)' : 'rgba(0, 200, 100, 0.6)';
    ctx.strokeStyle = height >= 0 ? 'rgba(255, 100, 100, 1)' : 'rgba(0, 200, 100, 1)';
    ctx.strokeWidth = 2;
    ctx.lineWidth = 1;
    ctx.fillRect(startX, startY, width, height);
    ctx.restore();
  }
}

var custom = Chart.controllers.bar.extend({
  draw: function draw(ease) {
    var meta = this.getMeta();
    var ctx = this.chart.chart.ctx;
    meta.data.forEach(function (price, i) {
      return drawData(price, i, meta.data, ctx);
    });
  }
});

Chart.controllers.financial = custom;