import "../styles/index.scss";
import "intersection-observer";
import scrollama from "scrollama";
import * as d3 from "d3";

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

const scroller = scrollama();

scroller
  .setup({
    step: ".slide"
  })
  .onStepEnter(response => {
    console.log(response);
  })
  .onStepExit(response => {
    console.log(response);
  });

window.addEventListener("resize", scroller.resize);