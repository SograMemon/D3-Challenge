//Define SVG heigh and width
var svgWidth= 960;
var svgHeight = 660;

//Define the charts margine as an object
var chartMargin= {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

//Define dimensions of chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

//Select div append svg and set dimentions
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

//Append a group and translate it right and down to adher to the margins
var chartGroup = svg
    .append(g)
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`)

// load the data from the csv and print to console
d3.csv("assets/data/data.csv").then(function(data){
    //print the data
    console.log(data);

    //
});
