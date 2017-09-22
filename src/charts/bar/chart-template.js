import externalScripts from '../line/chart-scripts.js';
import styles from './chart-styles';
import symbols from '../../fixtures/symbols';
import barChartOptions from '../../settings/bar-chart';

export default function(symbol, start, end) {
  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
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
        <script src="/financial-chart.js"></script>
        <script src="/barchart.js"></script>
        <style>${styles()}</style>
      </head>
      <body class="my-body">
        <div id='react-root'></div>
      </body>
    </html>
  `;
}
