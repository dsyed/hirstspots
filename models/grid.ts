import * as d3 from "d3";

class Grid {
  rows: number;
  cols: number;
  margin: number;
  distBetweenSpots: number;
  backgroundColor: string;
  radius: number;
  g: any;

  constructor(
    rows: number,
    cols: number,
    radius: number,
    margin: number,
    distBetweenSpots: number,
    backgroundColor: string
  ) {
    this.rows = rows;
    this.cols = cols;
    this.radius = radius;
    this.margin = margin;
    this.distBetweenSpots = distBetweenSpots;
    this.backgroundColor = backgroundColor;

    d3.selectAll("#controls input[type=range]")
      .on("input", () => this.updateChart());
  }

  incrementCoordinate(current: number, i: number) {
    if (i == 0) {
      return this.margin + this.radius;
    } else {
      return current + this.distBetweenSpots + (2 * this.radius)
    }
  }

  generateCoordinates() {
    let coordinates = [];
    let [x, y] = [0, 0];

    for (let row = 0; row < this.rows; row++) {
      y = this.incrementCoordinate(y, row);

      for (let col = 0; col < this.cols; col++) {
        x = this.incrementCoordinate(x, col);

        coordinates.push([x, y]);
      }
    }

    return coordinates;
  }
  randomColor() {}
  clear() {}
  render() {
    let coordinates = this.generateCoordinates();
    let width = 600;
    let height = 500;

    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height);

    const bg = svg.append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", this.backgroundColor);

    this.g = svg.append("g");

    this.g.selectAll("circle")
      .data(coordinates)
      .join("circle")
      .attr("cx", ([x]) => x)
      .attr("cy", ([, y]) => y)
      .attr("r", this.radius)
      .attr("fill", (d, i) => d3.interpolateRainbow(i / coordinates.length));

    return svg.node();
  }

  updateChart() {
    let target = d3.event.target;
    this[target.id] = +target.value;

    let coordinates = this.generateCoordinates();

    let circle = this.g.selectAll("circle")
      .data(coordinates);

    circle.exit().remove();
    circle.enter().append("circle")
      .attr("cx", ([x]) => x)
      .attr("cy", ([, y]) => y)
      .attr("r", this.radius)
      .attr("fill", (d, i) => d3.interpolateRainbow(i / coordinates.length));;

    circle
      .attr("cx", ([x]) => x)
      .attr("cy", ([, y]) => y)
      .attr("r", this.radius)
      .attr("fill", (d, i) => d3.interpolateRainbow(i / coordinates.length));
  }
}

export { Grid };
