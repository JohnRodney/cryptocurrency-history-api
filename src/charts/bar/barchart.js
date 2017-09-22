/* File is meant to be self evoking on the client side after
 * delivered to the front end browser. No imports are valid here */
const { barChartOptions, symbol, start, end, symbols } = Coinstaker.Config;
const { origin } = window.location;
const url = `${origin}/v1/${symbol}/${start}/${end}/`;

class BarChart extends React.Component {
  constructor() {
    super();
    this.state = {
      start: moment(start),
      end: moment(end),
      symbol: symbol,
      historyData: [],
      relativeVolume: 0,
    }
  }

  componentWillMount() {
    this.getData();
  }

  componentDidMount() {
    const start = new Pikaday({
      field: document.getElementById('start'),
      onSelect: start => this.setState({ start: moment(start) }),
      defaultDate: this.state.start.toDate(),
    });
    const end = new Pikaday({
      field: document.getElementById('end'),
      onSelect: end => this.setState({ end: moment(end) }),
      defaultDate: this.state.end.toDate(),
    });
  }

  updateChart() {
    const barChart = document.getElementById("bar-chart");
    const data = this.state.historyData;
    if (barChart && data) {
      const ctx = barChart.getContext('2d');
      new Chart(ctx, {
        type: 'financial',
        data: this.getChartData(data.map(d => d.date), data.map(d => d.price)),
        options: barChartOptions,
      });
    }

    const rvChart = document.getElementById("relative-volume");
    if (rvChart) {
      const ctx = rvChart.getContext('2d');
      new Chart(ctx, {
          type: 'horizontalBar',
          data: {
            datasets: [{
              data: [this.state.relativeVolume],
              backgroundColor: 'rgba(0, 200, 100, 0.5)',
              borderColor: 'rgba(0, 200, 100, 1)',
              borderWidth: 20,
              pointRadius: 0,
            }],
          },
          options: volumeChartOptions,
      });
    }
  }

  gotoNewChart() {
    const { symbol, start, end } = this.state;
    window.location = `${window.location.origin}/v1/chart/bar/${symbol}/${start.toISOString()}/${end.toISOString()}/`;
  }

  render() {
    this.updateChart();
    return (
      <div className='bar-char-root'>
        <div className="tool-bar">
          <select
            className="symbols"
            defaultValue={window.location.pathname.split('/')[4]}
            onChange={(e) => this.setState({ symbol: e.target.value })}
          >
            {
              symbols.map((sym, i) => <option key={sym + i} value={sym}>{sym}</option>)
            }
          </select>
          <input type="text" id="start" value={this.state.start.format('YYYY-MM-DD')}/>
          <input type="text" id="end" value={this.state.end.format('YYYY-MM-DD')}/>
          <button
            className="go"
            onClick={e => this.gotoNewChart()}
          >GO</button>
        </div>
        <div className={`percent-change-day ${this.state.dayChange >= 0 ? 'green' : 'red'}`}>
          ({this.state.dayChange}%)
          <p>24hr change</p>
        </div>
        <div className='relative-volume-label'>Relative Volume</div>
        <canvas id="bar-chart" width="400" height="400"></canvas>
        <canvas id="relative-volume" width="400" height="400"></canvas>
      </div>
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
    $.get(url, response => {
      const  { data } = response;
      const historyData = data.map(d => ({ date: moment(d.date_saved).unix(), price: d.price_usd }))
      const volumes = data.map(data => data["24h_volume_usd"])
      const relativeVolume = volumes[0] / (volumes.reduce((acc, nxt) => +acc + +nxt, 0) / volumes.length)
      const dayChange = data.pop().percent_change_24h;
      this.setState({ historyData, relativeVolume, dayChange });
    });
  }
}


$(document).ready(() => {
  ReactDOM.render(<BarChart />, document.getElementById('react-root'))
})

const volumeChartOptions = {
  tooltips: {
    enabled: false,
  },
  responsive: 'true',
  legend: { display: false },
  scaleFontColor: "#FFFFFF",
  scales: {
    scaleLabel: {
      fontColor: 'yellow',
      fontSize: '30',
    },
    yAxes: [{
      display: true,
      gridLines: { color: "white" },
    }],
    xAxes: [{
      display: true,
      gridLines: { color: "rgba(255, 255, 255, 0)" },
      ticks: { fontSize: 0, min: 0.0, max: 2.0, stepSize: 0.5, fontColor: 'white', padding: 50 },
    }],
  }
};
