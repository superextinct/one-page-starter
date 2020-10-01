import "../styles/index.scss";
import "intersection-observer";
import scrollama from "scrollama";
import ScrollChart from "./scrollchart";

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

const scrollChart = new ScrollChart();
scrollChart.setup();

// Scrollama setup
const scroller = scrollama();

scroller
  .setup({
    step: "div.slide"
  })
  .onStepEnter(response => {
      scrollChart.drawData(response.index);
  });
  // .onStepExit(response => {
  //   if (charts[response.index]) {
  //     charts[response.index].exit();
  //   }
  // });

window.addEventListener("resize", scroller.resize);
