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
      margin: 30px auto;
      height: 500px !important;
      width: 100% !important;
      background-color: #343434;
      box-shadow: 0 0 10px #263238;
    }
    select{
      background-color: #343434;
      color: white;
      padding: 20px;
      font-size: 40px;
      width: 200px;
    }
  `;
}
