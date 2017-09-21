/* File is meant to be self evoking on the client side after
 * delivered to the front end browser. No imports are valid here */
const { barChartOptions, symbol, start, end } = Coinstaker.Config;
const { origin } = window.location;
const url = `${origin}/v1/${symbol}/${start}/${end}/`;

class BarChart extends React.Component{
  constructor() {
    super();
    this.state = {
      historyData: [],
    }
  }

  componentWillMount() {
    this.getData();
  }

  updateChart() {
    const canvas = document.getElementById("myChart");
    const data = this.state.historyData;
    if (canvas && data) {
      const ctx = canvas.getContext('2d');
      return new Chart(ctx, {
        type: 'financial',
        data: this.getChartData(data.map(d => d.date), data.map(d => d.price)),
        options: barChartOptions,
      });
    }
  }

  render() {
    this.updateChart();

    return (
      <canvas id="myChart" width="400" height="400"></canvas>
    );
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
      console.log(data)
      const historyData = data.data.map(d => ({ date: moment(d.date_saved).unix(), price: d.price_usd }))
      this.setState({ historyData });
    });
  }
}

$(document).ready(() => {
  ReactDOM.render(<BarChart />, document.getElementById('react-root'))
})

