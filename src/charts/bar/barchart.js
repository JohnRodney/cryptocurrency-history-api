/* File is meant to be self evoking on the client side after
 * delivered to the front end browser. No imports are valid here */
const { barChartOptions, symbol, start, end } = Coinstaker.Config;
const { origin } = window.location;
const url = `${origin}/v1/${symbol}/${start}/${end}/`;

Chart.defaults.financial = Chart.defaults.bar;

const custom = Chart.controllers.bar.extend({
  draw: function(ease) {
    $('canvas').css('background', '#000035')
    // Now we can do some custom drawing for this dataset. Here we'll draw a red box around the first point in each dataset
    var meta = this.getMeta();
    var pt0 = meta.data;

    var ctx = this.chart.chart.ctx;
    meta.data.forEach((data, i) => {
      const step = parseInt(meta.data.length / 50);

      if (i % step === 0) {
        const startX = data._model.x;
        const startY = data._model.y;
        const nextX = i <= meta.data.length - step - 3 ? meta.data[i+step]._model.x : startX;
        const nextY = i <= meta.data.length - step - 3 ? meta.data[i+step]._model.y : startY;
        const width = Math.abs(nextX - startX - 4);
        let height = nextY - startY;
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

class lineChart {
  render(data) {
    const ctx = document.getElementById("myChart").getContext('2d');

    return new Chart(ctx, {
      type: 'financial',
      data: this.getChartData(data.map(d => d.date), data.map(d => d.price)),
      options: barChartOptions,
    });
  }

  getChartData (dates, prices) {
    return {
      labels: dates,
      datasets: [{
        data: prices,
        backgroundColor: '#3f9ccd',
        borderColor: '#3f9ccd',
        borderWidth: 2,
        pointRadius: 0,
      }],
    };
  }

  getData() {
    $.get(url, data => {
      this.render(
        data.data.map(
          d => ({ date: moment(d.date_saved).unix(), price: d.price_usd })
        )
      );
    });
  }

  start() {
    this.getData();
  }
}

new lineChart().start();
