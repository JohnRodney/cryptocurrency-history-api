import externalScripts from './chart-scripts.js';
import styles from './chart-styes.js';
import symbols from '../../fixtures/symbols';
import lineChartOptions from '../../settings/line-chart';

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
            lineChartOptions: ${JSON.stringify(lineChartOptions)},
          };
        </script>
        ${externalScripts.map(src => `<script src="${src}"></script>`).join('')}
        <script src="/linechart.js"></script>
        <style>${styles()}</style>
      </head>
      <body class="my-body">
        <canvas id="myChart" width="400" height="400"></canvas>
      </body>
    </html>
  `;
}
