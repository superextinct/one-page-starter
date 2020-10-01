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

        // Daten laden von .csv
        d3.csv("/assets/data/stocks.csv")
            .then(this.dataLoaded.bind(this));
    }

    dataLoaded(data) {
        const parseTime = d3.timeParse("%b %Y");
       
        // Nur Aktien im Januar anzeigen
        data = data.filter(d => {
            return d.date == "Jan 2000";
        });

        const domain = [];

        data.forEach(d => {
            // In korrekte Typen umwandeln
            d.price = +d.price;
            d.date = parseTime(d.date);
            domain.push(d.symbol);
        });

        // Skalen
        const xScale = d3.scaleBand()
            .domain(data.map(function(d) { return d.symbol; }))
            .range([0, this.width])
            .padding(0.2);

        this.svg.append("g")
            .attr("transform", `translate(0, ${this.height})`)
            .call(d3.axisBottom(xScale));

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => { return +d.price; })]).nice()
            .range([this.height, 0]);

        this.svg.append("g")
            .call(d3.axisLeft(yScale));

        const height = this.height;

        this.svg.selectAll("bars")
            .data(data)
            .enter()
            .append("rect")
                .attr("x", d => { return xScale(d.symbol); })
                .attr("y", d => { return yScale(d.price); })
                .attr("height", d => { return height - yScale(d.price); })
                .attr("width", xScale.bandwidth())
                .attr("fill", "lavender")
            .on("mouseover", this.mouseover.bind(this))
            .on("mousemove", this.mousemove.bind(this))
            .on("mouseleave", this.mouseleave.bind(this));
        
        // Tooltip stylen
        this.tooltip = d3.select("#slide2 .tooltip")
            .style("opacity", 0)
            .style("color", "black")
            .style("background-color", "white")
            .style("padding", "5px");    


        // Daten und Skala für Zugriff außerhalb von setup() speichern
        this.data = data;
        this.xScale = xScale;
        this.yScale = yScale;
    }

    mouseover(e, d) {
        this.tooltip
            .style("opacity", 1);
    }

    mousemove(e, d) {
        this.tooltip
            .style("left", (d3.pointer(e)[0]+60) + "px")
            .style("top", (d3.pointer(e)[1]+40) + "px")
            .text(d.symbol + ": " + d.price);
    }

    mouseleave(e) {
        this.tooltip
            .style("opacity", 0);
    }

    enter() {

    }
    
    exit() {
        console.log("Chart 2 exited");
    }
}

export default Chart2;