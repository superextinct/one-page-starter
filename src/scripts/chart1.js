import * as d3 from 'd3';

class Chart1 {
    setup() {
        this.width = 600;
        this.height = 400;
        this.margin = { left: 50, top: 50, right: 50, bottom: 50 };
        this.hasAnimated = false;

        // SVG Größe bestimmen
        this.svg = d3.select("#chart1")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
                .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);

        // Daten laden von .csv
        d3.csv("/assets/data/stocks.csv")
            .then(this.dataLoaded.bind(this));
    }

    dataLoaded(data) {
        const parseTime = d3.timeParse("%b %Y");

        data.forEach(d => {
            // In korrekte Typen umwandeln
            d.price = +d.price;
            d.date = parseTime(d.date);
        });

        // Nur "S&P 500" Aktie anzeigen
        data = data.filter(d => {
            return d.symbol == "S&P 500";
        });

        // Skalen
        const xScale = d3.scaleTime()
            .domain(d3.extent(data, d => { return d.date; }))
            .range([0, this.width]);

        this.svg.append("g")
            .attr("transform", `translate(0, ${this.height})`)
            .call(d3.axisBottom(xScale));

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => { return +d.price; })]).nice()
            .range([this.height, 0]);

        this.svg.append("g")
            .call(d3.axisLeft(yScale));

        // Daten und Skala für Zugriff außerhalb von setup() speichern
        this.data = data;
        this.xScale = xScale;
        this.yScale = yScale;
    }

    enter() {
        if (!this.hasAnimated) {
            this.svg.append("path")
                .datum(this.data)
                .attr("fill", "#cce5df")
                .attr("stroke-width", 1.5)
                .attr("d", d3.area()
                    .x(d => { return this.xScale(d.date); })
                    .y0(this.height)
                    .y1(this.height)
                )
                .transition()
                .duration(1000)
                .attr("d", d3.area()
                    .x(d => { return this.xScale(d.date); })
                    .y0(this.height)
                    .y1( d => { return this.yScale(d.price); })
                );
        }
    }

    exit() {
        console.log("Chart 1 exited");
    }
}

export default Chart1;