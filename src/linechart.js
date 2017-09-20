class lineChart {
  jsfiddle(data) {
    const ctx = document.getElementById("myChart").getContext('2d');

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d.date),
        datasets: [{
          label: 'value in USD',
          data: data.map(d => d.price),
          backgroundColor: [
            'rgba(255, 255, 255, 0.2)',
          ],
          borderColor: [
            'rgba(0,0,0,1)',
          ],
          borderWidth: 3,
          lineTension: 0,
          pointRadius: 0,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
          }],
          yAxes: [{
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            }
          }]
        }
      }
    });
  }
  getData() {
    $.get( `${window.location.origin}/v1/${Coinstaker.Config.symbol}/2017-09-10T14:30:25.860Z/2017-09-20T20:30:07.256Z/`, data => {
      const transformed = data.data.map(d => {
        return {
          date: moment(d.date_saved).format('d-MM-YY'),
          price: d.price_usd
        }
      })
      this.jsfiddle(transformed);
    });
  }
  start() {
    this.getData();
  }
}

new lineChart().start();
