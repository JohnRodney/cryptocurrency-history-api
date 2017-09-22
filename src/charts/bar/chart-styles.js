export default function genStyles() {
  return `
    body {
      background: url("https://365stockmarketnews.files.wordpress.com/2016/07/fotolia_32116767_subscription_xxl.jpg");
      background-size: cover;
    }
    canvas {
      margin: 0 auto;
    }
    #bar-chart {
      width: 100% !important;
      margin-top: 100px;
      height: calc(70% - 100px) !important;
    }
    #relative-volume {
      margin-top: 20px;
      float: right;
      width: 100% !important;
      height: calc(30% - 140px) !important;
    }
    #react-root{
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      position: absolute;
      background-color: rgba(0, 0, 0, .6);
    }

    .percent-change-day{
      position: absolute;
      color: white;
      bottom: 0;
      pointer-events: none;
      width: 100%;
      height: 70px;
      text-align: center;
      background: white;
      font-size: 40;
    }
    .relative-volume-label {
      position: absolute;
      top: 72.5%;
      left: 0;
      color: white;
      height: 30px;
      padding: 20px;
      font-size: 16px;
      text-align: center;
    }
    .tool-bar {
      text-align: center;
      width: 100%;
      height: 90px;
      background: #2b87da;
      position: absolute;
      top: 0;
      padding: 20px;
      box-sizing: border-box;
    }
    .tool-bar select{
      color: white;
      background: #2b87da;
      border: 2px solid white;
      font-size: 33px;
      padding: 5px;
      outline: none;
      display: inline;
      vertical-align: middle;
    }
    .percent-change-day p {
      font-size: 12;
      color: black;
      margin: 0;
      padding: 0;
    }
    .green {
      color: #90ff90;
    }
    .red {
      color: #c62828;
    }
    .is-hidden {
      visibility: hidden;
    }
    .pika-single {
      padding: 20px;
      background: white;
      min-width: 300px;
    }
    .pika-single table {
      width: 300px;
    }
    abbr[title] {
      text-decoration: none;
      padding-bottom: 10px;
    }
    .pika-button {
      background: #2b87da;
      color: white;
      outline: none;
      border: none;
      width: calc(100% - 2px);
      margin-bottom: 2px;
    }
    .pika-button:hover{
      background: #efefef;
      color: #2b87da;
    }
    .pika-select {
      background: #2b87da;
      float: right;
      color: white;
      outline: none;
    }
    .pika-prev, .pika-next{
      background: #2b87da;
      color: white;
      width: 45%;
      margin: 2.5%;
      border: none;
      outline: none;
    }
    .pika-label {
      padding: 5px;
    }
    .tool-bar input {
      display: inline;
      vertical-align: middle;
      font-size: 20px;
      padding: 10px;
      margin: 0 20px 0 20px;
    }
    .go {
      display: inline;
      vertical-align: middle;
      background: #2bda87;
      padding: 12px;
      font-size: 20px;
      color: white;
      border: 0;
      outline: none;
      cursor: pointer;
    }
    #chartjs-tooltip {
      position: absolute,
      width: 100%;
      height: 100%;
    }
    .sk-cube-grid {
      width: 100px;
      height: 100px;
      margin: 100px auto;
      position: absolute;
      top: 200px;
      left: 45%;
    }

    .sk-cube-grid .sk-cube {
      width: 33%;
      height: 33%;
      background-color: rgba(255, 255, 255, 0.7);
      float: left;
      -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
              animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
    }
    .sk-cube-grid .sk-cube1 {
      -webkit-animation-delay: 0.2s;
              animation-delay: 0.2s; }
    .sk-cube-grid .sk-cube2 {
      -webkit-animation-delay: 0.3s;
              animation-delay: 0.3s; }
    .sk-cube-grid .sk-cube3 {
      -webkit-animation-delay: 0.4s;
              animation-delay: 0.4s; }
    .sk-cube-grid .sk-cube4 {
      -webkit-animation-delay: 0.1s;
              animation-delay: 0.1s; }
    .sk-cube-grid .sk-cube5 {
      -webkit-animation-delay: 0.2s;
              animation-delay: 0.2s; }
    .sk-cube-grid .sk-cube6 {
      -webkit-animation-delay: 0.3s;
              animation-delay: 0.3s; }
    .sk-cube-grid .sk-cube7 {
      -webkit-animation-delay: 0s;
              animation-delay: 0s; }
    .sk-cube-grid .sk-cube8 {
      -webkit-animation-delay: 0.1s;
              animation-delay: 0.1s; }
    .sk-cube-grid .sk-cube9 {
      -webkit-animation-delay: 0.2s;
              animation-delay: 0.2s; }

    @-webkit-keyframes sk-cubeGridScaleDelay {
      0%, 70%, 100% {
        -webkit-transform: scale3D(1, 1, 1);
                transform: scale3D(1, 1, 1);
      } 35% {
        -webkit-transform: scale3D(0, 0, 1);
                transform: scale3D(0, 0, 1);
      }
    }

    @keyframes sk-cubeGridScaleDelay {
      0%, 70%, 100% {
        -webkit-transform: scale3D(1, 1, 1);
                transform: scale3D(1, 1, 1);
      } 35% {
        -webkit-transform: scale3D(0, 0, 1);
                transform: scale3D(0, 0, 1);
      }
    }
    @media only screen and (max-width: 880px) {
      .c-hamburger {
        visibility: visible !important;
      }
      .collapsable-menu {
        visibility: hidden;
        width: 100%;
        text-align: center;
        width: 100%;
        background-color: #2b87da;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
      }
      .pika-single {
        left: 0 !important;
        padding: 20px;
        background: white;
        width: calc(100% - 40px);
        min-width: 300px;
      }
      .collapsable-menu.show{
        visibility: visible;
      }
      .collapsable-menu * {
        display: block !important;
        margin: 20px 100px !important;
        width: 50%;
      }
    }
    .c-hamburger {
      z-index: 1;
      visibility: hidden;
      position: absolute;
      display: block;
      overflow: hidden;
      margin: 0;
      padding: 0;
      width: 90px;
      height: 90px;
      top: 0;
      left: 0;
      font-size: 0;
      text-indent: -9999px;
      appearance: none;
      box-shadow: none;
      border-radius: none;
      border: none;
      cursor: pointer;
      transition: background 0.3s;
    }
    .c-hamburger:focus {
      outline: none;
    }
    .c-hamburger span {
      display: block;
      position: absolute;
      top: 44px;
      left: 18px;
      right: 18px;
      height: 8px;
      background: white;
    }

    .c-hamburger span::before,
    .c-hamburger span::after {
      position: absolute;
      display: block;
      left: 0;
      width: 100%;
      height: 8px;
      background-color: #fff;
      content: "";
    }

    .c-hamburger span::before {
      top: -20px;
    }

    .c-hamburger span::after {
      bottom: -20px;
    }
    .c-hamburger--htx {
      background-color: #2b87da;
    }

    .c-hamburger--htx span {
      transition: background 0s 0.3s;
    }

    .c-hamburger--htx span::before,
    .c-hamburger--htx span::after {
      transition-duration: 0.3s, 0.3s;
      transition-delay: 0.3s, 0s;
    }

    .c-hamburger--htx span::before {
      transition-property: top, transform;
    }

    .c-hamburger--htx span::after {
      transition-property: bottom, transform;
    }

    /* active state, i.e. menu open */
    .c-hamburger--htx.is-active {
      background-color: #2b87da;
    }

    .c-hamburger--htx.is-active span {
      background: none;
    }

    .c-hamburger--htx.is-active span::before {
      top: 0;
      transform: rotate(45deg);
    }

    .c-hamburger--htx.is-active span::after {
      bottom: 0;
      transform: rotate(-45deg);
    }

    .c-hamburger--htx.is-active span::before,
    .c-hamburger--htx.is-active span::after {
      transition-delay: 0s, 0.3s;
    }
  `;
}
