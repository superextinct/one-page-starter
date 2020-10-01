import * as d3 from "d3";

class ScrollChart {
    setup() {
        this.width = 1000;
        this.height = 600;
        this.margin = { left: 100, top: 50, right: 50, bottom: 100 };

        // SVG Größe bestimmen
        this.svg = d3.select("#chart")
            .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);

        // Mehrere Dateien auf einmal laden
        Promise.all([
            d3.csv("assets/data/FallzahlenCoronavirus.csv"),
            d3.dsv(";", "assets/data/DAXEntwicklungvon1987bis2020.csv"),
            d3.csv("assets/data/EntwicklungdesDAX.csv"),
            d3.csv("assets/data/EntwicklungderindustriellenProduktion.csv"),
            d3.csv("assets/data/Produktionsindeximvergleich.csv")
        ]).then(this.dataLoaded.bind(this));
    }

    dataLoaded([fallzahlen, daxBis2020, daxEntwicklung, industProduktion, produktionsIndex]) {
        const parseTimeYm = d3.timeParse("%Y-%m");
        const parseTimeYmd = d3.timeParse("%Y-%m-%d");

        fallzahlen.forEach(row => {
            row.Tag = +row.Tag;
            row.Deutschland = +row.Deutschland;
            row.Frankreich = +row.Frankreich;
            row.Spanien = +row.Spanien;
            row.USA = +row.USA;
            row.Italien = +row.Italien;
            row.Russland = +row.Russland;
            row.UK = +row.UK;
            row.Brasilien = +row.Brasilien;
            row.Indien = +row.Indien;
        });

        daxBis2020.forEach(row => {
            row.value = parseFloat(row.value.replace(",", "."));
            row.date = parseTimeYm(row.date);
        });

        daxEntwicklung.forEach(row => {
            row.Open = parseFloat(row.Open);
            row.Date = parseTimeYmd(row.Date);
        });

        industProduktion.forEach(row => {
            row.Fertigungsindustrie = parseFloat(row.Fertigungsindustrie);
            row.Date = parseTimeYm(row.Date);
        });

        produktionsIndex.forEach(row => {
            row.Coronakrise2020 = +row.Coronakrise2020;
            row.Finanzkrise2008 = +row.Finanzkrise2008;
            row.Date = +row.Date;
        });

        this.data = [fallzahlen, daxBis2020, daxEntwicklung, industProduktion, produktionsIndex];


        // Erste Skalen definieren
        this.x = d3.scaleLinear()
            .domain(d3.extent(fallzahlen, d => { return d.Tag; }))
            .range([0, this.width]);

        this.y = this.yScale = d3.scaleLinear()
            .domain([0, 347.268]) // auf höchsten Wert ändern [0, 3000]
            .range([this.height, 0]);


        // Leere Skalen hinzufügen
        this.svg.append("g")
            .attr("class", "xAxis")
            .attr("transform", `translate(0, ${this.height})`)
            .call(d3.axisBottom(this.x));

        this.svg.append("g")
            .attr("class", "yAxis")
            .call(d3.axisLeft(this.y));
    }

    drawData(numSlide) {
        const x = this.xScale(numSlide);
        const y = this.y.domain(this.yDomain(numSlide));

        // bereits bestehende Gruppe ausblenden und entfernen
        this.svg.selectAll(".graph")
            .transition()
            .duration(500)
            .style("opacity", 0)
            .delay(500)
            .remove();

        // Achsen anpassen und animieren
        this.svg.select(".xAxis")
            .transition(1000)
            .call(d3.axisBottom(this.x));

        this.svg.select(".yAxis")
            .transition(1000)
            .call(d3.axisLeft(this.y));

        // Neue Gruppe erstellen
        this.g = this.svg.append("g")
            .attr("class", "graph")
            .style("opacity", 0);

        // Entsprechendes Diagramm zeichnen
        switch (numSlide) {
            case 0:
                this.chart1(this.data[numSlide], x, y);
            case 1:
                this.chart2(this.data[numSlide], x, y);
            case 2:
                this.chart3(this.data[numSlide], x, y);
            case 3:
                this.chart4(this.data[numSlide], x, y);
            case 4:
                this.chart5(this.data[numSlide], x, y);
        }

        // Gruppe einblenden
        this.g.transition()
            .duration(500)
            .style("opacity", 1);
    }

    xScale(numSlide) {
        switch (numSlide) {
            case 0:
                return d3.scaleLinear()
                    .domain(d3.extent(this.data[numSlide], d => { return d.Tag; }))
                    .range([0, this.width]);
            case 1:
                return d3.scaleTime()
                    .domain(d3.extent(this.data[numSlide], d => { return d.date; }))
                    .range([0, this.width]);
            case 2:
                return d3.scaleTime()
                    .domain(d3.extent(this.data[numSlide], d => { return d.Date; }))
                    .range([0, this.width]);
            case 3:
                return d3.scaleTime()
                    .domain(d3.extent(this.data[numSlide], d => { return d.Date; }))
                    .range([0, this.width]);
            case 4:
                return d3.scaleLinear()
                    .domain(d3.extent(this.data[numSlide], d => { return d.Date; }))
                    .range([0, this.width]);
        }
    }

    yDomain(numSlide) {
        switch (numSlide) {
            case 0:
                return [100, 347268];
            case 1:
                return [0, d3.max(this.data[numSlide], d => { return d.value; })];
            case 2:
                return [0, 31.80];
            case 3:
                return [-50, 50];
            case 4:
                return [-20, 20];
        }
    }

    chart1(data, x, y) {
        // Liniendiagramm Deutschland
        this.g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "yellow")
            .attr("d", d3.line()
                .defined(d => { return !isNaN(d.Deutschland); })
                .x(d => { return x(d.Tag); })
                .y(d => { return y(d.Deutschland); })
            );

        //Liniendiagramm für Frankreich
        this.g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "orange")
            .attr("d", d3.line()
                .defined(d => { return !isNaN(d.Frankreich); })
                .x(d => { return x(d.Tag); })
                .y(d => { return y(d.Frankreich); })
            );

        // Liniendiagramm für Spanien
        this.g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("d", d3.line()
                .defined(d => { return !isNaN(d.Spanien); })
                .x(d => { return x(d.Tag); })
                .y(d => { return y(d.Spanien); })
            );

        // Liniendiagramm für USA
        this.g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "pink")
            .attr("d", d3.line()
                .defined(d => { return !isNaN(d.USA); })
                .x(d => { return x(d.Tag); })
                .y(d => { return y(d.USA); })
            );

        // Liniendiagramm für Italien
        this.g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "green")
            .attr("d", d3.line()
                .defined(d => { return !isNaN(d.Italien); })
                .x(d => { return x(d.Tag); })
                .y(d => { return y(d.Italien); })
            );

        // Liniendiagramm für UK
        this.g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "brown")
            .attr("d", d3.line()
                .defined(d => { return !isNaN(d.UK); })
                .x(d => { return x(d.Tag); })
                .y(d => { return y(d.UK); })
            );

        // Liniendiagramm für Brasilien
        this.g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "lavender")
            .attr("d", d3.line()
                .defined(d => { return !isNaN(d.Brasilien); })
                .x(d => { return x(d.Tag); })
                .y(d => { return y(d.Brasilien); })
            );

        // Liniendiagramm für Indien
        this.g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "grey")
            .attr("d", d3.line()
                .defined(d => { return !isNaN(d.Indien); })
                .x(d => { return x(d.Tag); })
                .y(d => { return y(d.Indien); })
            );
    }

    chart2(data, x, y) {

    }

    chart3(data, x, y) {

    }

    chart4(data, x, y) {

    }

    chart5(data, x, y) {

    }
}

export default ScrollChart;