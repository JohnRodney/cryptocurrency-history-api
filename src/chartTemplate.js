import externalScripts from './chartScripts.js';
import styles from './chartStyes.js';
import symbols from './fixtures/symbols';

export default function(symbol, start, end) {
  return `
    <body>
      <script>
        var Coinstaker = {};
        Coinstaker.Config = {
          symbol: "${symbol}",
          start: "${start}",
          end: "${end}",
          symbols: ${JSON.stringify(symbols)},
        };
      </script>
      ${externalScripts.map(src => `<script src="${src}"></script>`).join('')}
      <script src="/linechart.js"></script>
      <style>${styles()}</style>
      <canvas id="myChart" width="400" height="400"></canvas>
      <div id="target"><div>
    </body>
  `;
}
