export default function genStyles() {
  return `
    body.my-body {
      padding: 0 !important,
      margin: 0 !important,
    }
    canvas {
      margin: 0 auto;
      height: calc(100% - 20px) !important;
      width: 100% !important;
      background-color: white;
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
