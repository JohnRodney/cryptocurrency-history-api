import externalScripts from './chartScripts.js';
import styles from './chartStyes.js';

export default function(symbol, start, end) {
  return `
    <body>
      <script>
        var Coinstaker = {};
        Coinstaker.Config = {
          symbol: "${symbol}",
          start: "${start}",
          end: "${end}",
        };
      </script>
      ${externalScripts.map(src => `<script src="${src}"></script>`).join('')}
      <script src="/linechart.js"></script>
      <style>${styles()}</style>
      <canvas id="myChart" width="400" height="400"></canvas>
    </body>
  `;
}
