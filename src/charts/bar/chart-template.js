import externalScripts from '../line/chart-scripts.js';
import styles from '../line/chart-styes.js';
import symbols from '../../fixtures/symbols';
import barChartOptions from '../../settings/bar-chart';

export default function(symbol, start, end) {
  return `
    <html>
      <head>
        <script>
          var Coinstaker = {};
          Coinstaker.Config = {
            symbol: "${symbol}",
            start: "${start}",
            end: "${end}",
            symbols: ${JSON.stringify(symbols)},
            barChartOptions: ${JSON.stringify(barChartOptions)},
          };
        </script>
        ${externalScripts.map(src => `<script src="${src}"></script>`).join('')}
        <script src="/barchart.js"></script>
        <style>${styles()}</style>
      </head>
      <body class="my-body">
        <canvas id="myChart" width="400" height="400"></canvas>
      </body>
    </html>
  `;
}
