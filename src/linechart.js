class lineChart {
  jsfiddle(data) { const ctx = document.getElementById("myChart").getContext('2d');
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
    $(document).ready(() => this.addDropdown());
  }
}

new lineChart().start();
