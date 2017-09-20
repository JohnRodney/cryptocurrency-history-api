const { lineChartOptions, symbol, start, end } = Coinstaker.Config;
const { origin } = window.location;
const url = `${origin}/v1/${symbol}/${start}/${end}/`;

class lineChart {
  render(data) {
    const ctx = document.getElementById("myChart").getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d.date),
        datasets: [{
          data: data.map(d => d.price),
          backgroundColor: '#3f9ccd',
          borderColor: '#3f9ccd',
          borderWidth: 2,
          pointRadius: 0,
        }],
      },
      options: lineChartOptions,
    });
  }

  getData() {
    $.get(url, data => {
      this.render(data.data
        .map(d => ({ date: moment(d.date_saved).unix(), price: d.price_usd })));
    });
  }

  start() {
    this.getData();
  }
}

new lineChart().start();
