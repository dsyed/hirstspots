import * as d3 from "d3";
import { Grid } from "./models/grid";

let grid = new Grid(4, 5, 20, 60, 45, "#fbfbf9");
d3.select("#grid").append(() => grid.render());
