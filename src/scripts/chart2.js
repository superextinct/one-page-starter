import * as d3 from 'd3';

class Chart2 {
    setup() {
        this.width = 600;
        this.height = 400;
        this.margin = { left: 50, top: 50, right: 50, bottom: 50 };
        this.hasAnimated = false;

        // SVG Größe bestimmen
        this.svg = d3.select("#chart2")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
                .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);
    }

    enter() {
        console.log("Chart 2 entered");
    }
    
    exit() {
        console.log("Chart 2 exited");
    }
}

export default Chart2;