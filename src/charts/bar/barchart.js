/* File is meant to be self evoking on the client side after
 * delivered to the front end browser. No imports are valid here */
const { barChartOptions, symbol, start, end, symbols } = Coinstaker.Config;
const { origin } = window.location;
const url = `${origin}/v1/${symbol}/${start}/${end}/`;

/* TODO figure out how to write a function from an object method
 *   into a template string then this can be migrated to settings
 *   *  */
barChartOptions.tooltips.custom = (toolTips) => {
  toolTips.xPadding = 50;
  toolTips.yPadding = 60;
  toolTips.height = 250;
  toolTips.width = 350;
  toolTips.titleMarginBottom = 50;
  toolTips.titleFontSize = 22;
  toolTips.bodyFontSize = 40;
  toolTips.displayColors = false;
  toolTips.backgroundColor = 'white';
  toolTips.titleFontColor = 'black';
  toolTips.bodyFontColor = 'black';
  if (toolTips.title && toolTips.title[0] && toolTips.body && toolTips.body[0]) {
    const date = moment.unix(+toolTips.title[0]);
    toolTips.title[0] = date.format("MMMM Do YYYY");
    toolTips.body[0].lines[0] = `$${parseFloat(toolTips.body[0].lines[0])}`;
  }
};

class BarChart extends React.Component {
  constructor() {
    super();
    this.state = {
      start: moment(start),
      end: moment(end),
      symbol: symbol,
      historyData: [],
      relativeVolume: 0,
      status: 'needs-data'
    }
  }

  componentWillMount() {
    this.getData();
  }

  componentDidMount() {
    const start = new Pikaday({
      field: document.getElementById('start'),
      onSelect: start => this.setState({ start: moment(start), status: 'needs-data' }),
      defaultDate: this.state.start.toDate(),
    });
    const end = new Pikaday({
      field: document.getElementById('end'),
      onSelect: end => this.setState({ end: moment(end), status: 'needs-data' }),
      defaultDate: this.state.end.toDate(),
    });
  }

  updateChart() {
    const barChart = document.getElementById("bar-chart");
    const data = this.state.historyData;
    if (barChart && data) {
      const ctx = barChart.getContext('2d');
      if (this.financial) { this.financial.destroy() }
      this.financial = new Chart(ctx, {
        type: 'financial',
        data: this.getChartData(data.map(d => d.date), data.map(d => d.price)),
        options: barChartOptions,
      });
    }

    const rvChart = document.getElementById("relative-volume");
    if (rvChart) {
      const ctx = rvChart.getContext('2d');
      if (this.rv) { this.rv.destroy() }
      this.rv = new Chart(ctx, {
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
    let loading = '';
    if (this.state.status === 'needs-data') {
      loading = (
        <div className="sk-cube-grid">
          <div className="sk-cube sk-cube1"></div>
          <div className="sk-cube sk-cube2"></div>
          <div className="sk-cube sk-cube3"></div>
          <div className="sk-cube sk-cube4"></div>
          <div className="sk-cube sk-cube5"></div>
          <div className="sk-cube sk-cube6"></div>
          <div className="sk-cube sk-cube7"></div>
          <div className="sk-cube sk-cube8"></div>
          <div className="sk-cube sk-cube9"></div>
        </div>
      );
      this.getData();
    } else if (this.state.status === 'update-charts') {
      this.updateChart();
    }
    return (
      <div className='bar-char-root'>
        { loading }
        <div className="tool-bar">
          <select
            className="symbols"
            defaultValue={window.location.pathname.split('/')[4]}
            onChange={(e) => { this.setState({ symbol: e.target.value, status: 'needs-data' })}}
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
    const { origin } = window.location;
    const { start, end, symbol } = this.state;
    history.replaceState({}, "", `/v1/chart/bar/${symbol}/${start.toISOString()}/${end.toISOString()}/`)
    $.get(`${origin}/v1/${symbol}/${start.toISOString()}/${end.toISOString()}/`
      , response => {
      const  { data } = response;
      const historyData = data.map(d => ({ date: moment(d.date_saved).unix(), price: d.price_usd }))
      const volumes = data.map(data => data["24h_volume_usd"])
      const relativeVolume = volumes[0] / (volumes.reduce((acc, nxt) => +acc + +nxt, 0) / volumes.length)
      const dayChange = data.pop().percent_change_24h;
      this.setState({ historyData, relativeVolume, dayChange, status: 'update-charts' });
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
      ticks: { fontSize: 0, min: 0.0, suggestedMax: 2.0, stepSize: 0.5, fontColor: 'white', padding: 50 },
    }],
  }
};
