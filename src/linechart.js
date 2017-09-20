class lineChart {
  jsfiddle(data) { const ctx = document.getElementById("myChart").getContext('2d');
    Chart.defaults.global.defaultFontColor = "#fff";
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d.date),
        datasets: [{
          label: 'value in USD',
          data: data.map(d => d.price),
          backgroundColor: 'rgba(214, 140, 44, 0)',
          borderColor: '#FFEB3B',
          borderWidth: 2,
          lineTension: 0,
          pointRadius: 0,
          scaleFontColor: "#FFFFFF"
        }],
      },
      options: {
        legend: {
          display: false,
        },
        scaleFontColor: "#FFFFFF",
        scales: {
          xAxes: [{
            display: false,
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
            ticks: {
              fontSize: 20,
            },
          }],
          yAxes: [{
            display: false,
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
            ticks: {
              fontSize: 40,
            },
          }]
        }
      }
    });
  }

  getData() {
    $.get( `${window.location.origin}/v1/${Coinstaker.Config.symbol}/${Coinstaker.Config.start}/${Coinstaker.Config.end}/`, data => {
      const transformed = data.data.map(d => {
        return {
          date: moment(d.date_saved).format('d-MM-YY'),
          price: d.price_usd
        }
      })
      this.jsfiddle(transformed);
    });
  }
  test() {
    console.log('hi')
  }

  addDropdown() {
    const $target = $('#target');
    const currentSymbol = window.location.href.split('/')[6];
    const html = `
      <select>
        ${Coinstaker.Config.symbols.map(sym => `<option ${sym === currentSymbol ? 'selected="selected"' : ''}"value="${sym}">${sym}</option>`).join('')}
      </select>
    `;
    $target.html(html)
    $('select').change((e) => {
      const targetPath = window.location.href.replace(currentSymbol, e.target.value)
      window.location = targetPath;
    });
  }

  start() {
    this.getData();
    //$(document).ready(() => this.addDropdown());
  }
}

new lineChart().start();
