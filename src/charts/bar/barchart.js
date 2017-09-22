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
      showMenu: false,
      start: moment(start),
      end: moment(end),
      symbol: symbol,
      historyData: [],
      relativeVolume: 0,
      status: 'needs-data'
    }
    this.handleResponse = this.handleResponse.bind(this);
  }

  componentDidMount() {
    ['start', 'end'].forEach(id => this.datePicker(id))
    startBurgers(this);
  }

  datePicker(id) {
    this[id] = new Pikaday({
      field: document.getElementById(id),
      onSelect: date => this.setState(Object.assign({ status: 'needs-data' }, true ? { start: moment(date) } : { end: moment(date) })),
      defaultDate: this.state[id].toDate(),
    });
  }

  updateChart(id, type, data, options) {
    const target = document.getElementById(id);
    if (target && data) {
      const ctx = target.getContext('2d');
      if (this[type]) { this[type].destroy() }
      this[type] = new Chart(ctx, { type, data, options });
    }
  }

  getHorizontalBarData() {
    return {
      datasets: [{
        data: [this.state.relativeVolume],
        backgroundColor: 'rgba(0, 200, 100, 0.5)',
        borderColor: 'rgba(0, 200, 100, 1)',
        borderWidth: 20,
        pointRadius: 0,
      }],
    };
  }

  updateCharts() {
    const data = this.state.historyData;
    this.updateChart('bar-chart', 'financial', this.getChartData(data.map(d => d.date), data.map(d => d.price)), barChartOptions)
    this.updateChart('relative-volume', 'horizontalBar', this.getHorizontalBarData(), volumeChartOptions);
  }

  render() {
    const { status } = this.state;
    let loading = status === 'needs-data' ? this.renderLoading : '';
    ({ 'needs-data': this.getData, 'update-charts': this.updateCharts }[status]).call(this)

    return (
      <div className='bar-char-root'>
        { loading }
        { this.renderToolBar() }
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

  renderLoading() {
    return (
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
  }

  renderToolBar() {
    return (
      <div className="tool-bar">
        <button className={`c-hamburger c-hamburger--htx`}>
          <span></span>
        </button>
        <div className={`collapsable-menu  ${this.state.showMenu ? 'show' : 'hide'}`}>
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
        </div>
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
    console.log(this)
    const { start, end, symbol } = this.state;
    const urlEnd =`${symbol}/${start.toISOString()}/${end.toISOString()}/`;
    history.replaceState({}, "", `/v1/chart/bar/${urlEnd}`)
    $.get(`${origin}/v1/${urlEnd}`, this.handleResponse);
  }

  handleResponse(response) {
    console.log(response)
    const  { data } = response;
    const historyData = data.map(d => ({ date: moment(d.date_saved).unix(), price: d.price_usd }))
    const volumes = data.map(data => data["24h_volume_usd"])
    const relativeVolume = volumes[0] / (volumes.reduce((acc, nxt) => +acc + +nxt, 0) / volumes.length)
    const dayChange = data[data.length-1].percent_change_24h ? data.pop().percent_change_24h : 0;
    this.setState({ historyData, relativeVolume, dayChange, status: 'update-charts' });
  }
}

$(document).ready(() => {
  ReactDOM.render(<BarChart />, document.getElementById('react-root'))
})

const volumeChartOptions = {
  tooltips: { enabled: false },
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

function startBurgers(component) {
  const toggles = document.querySelectorAll(".c-hamburger");
  toggleHandler(toggles[0])

  function toggleHandler(toggle) {
    toggle.addEventListener("click", function(e) {
      e.preventDefault();
      component.setState({ showMenu: !component.state.showMenu });
      (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
    });
  }
};
