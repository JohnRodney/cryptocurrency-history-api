export default function genStyles() {
  return `
    body {
        font: 12px Arial;
    }
    path {
        stroke: steelblue;
        stroke-width: 2;
        fill: none;
    }
    canvas {
      height: 500px !important;
      width: 800px !important;
    }
  `;
}
