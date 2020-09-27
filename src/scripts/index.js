import "../styles/index.scss";
import "intersection-observer";
import scrollama from "scrollama";
import Chart1 from "./chart1";
import Chart2 from "./chart2";
import Chart3 from "./chart3";

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

// Chart Instanzen erstellen und jeweils setup() ausführen
const charts = [
  null,
  new Chart1(),
  new Chart2(),
  new Chart3()
];

charts.filter( chart => chart !== null)
  .forEach( chart => {
    chart.setup();
  });

// Scrollama setup
const scroller = scrollama();

scroller
  .setup({
    step: ".slide"
  })
  .onStepEnter(response => {
    if (charts[response.index]) {
      charts[response.index].enter();
    }
  })
  .onStepExit(response => {
    if (charts[response.index]) {
      charts[response.index].exit();
    }
  });

window.addEventListener("resize", scroller.resize);
