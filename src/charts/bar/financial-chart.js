Chart.defaults.financial = Chart.defaults.bar;

function drawData(price, i, data, ctx) {
  const step = parseInt(data.length / (window.innerWidth /30));
  if (i % step === 0) {
    const startX = i === 0 ? price._model.x + 5 : price._model.x;
    const startY = price._model.y;
    const nextX = i <= data.length - step - 3 ? data[i+step]._model.x : startX;
    const nextY = i <= data.length - step - 3 ? data[i+step]._model.y : startY;
    const width = Math.abs(nextX - startX - 4);
    let height = nextY - startY;
    height = height < 2 && height >= -1 ? 1 : height;

    ctx.save();
    ctx.fillStyle = height >= 0 ? 'rgba(255, 100, 100, 1)' : 'rgba(0, 200, 100, 1)';
    ctx.lineWidth = 1;
    ctx.fillRect(startX, startY, width, height);
    ctx.restore();
  }
}

const custom = Chart.controllers.bar.extend({
  draw(ease) {
    const meta = this.getMeta();
    const ctx = this.chart.chart.ctx;
    meta.data.forEach((price, i) => drawData(price, i, meta.data, ctx));
  }
});

Chart.controllers.financial = custom;
