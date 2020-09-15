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
    .append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`)

// load the data from the csv and print to console
d3.csv("assets/data/data.csv").then(function(data){
    //print the data
    console.log(data);

    //Formate the data health care and poverty value to number
    data.forEach(function(data){
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
    });

    //Configure the axis
    // d3.event returns the min and max to set the axis
    var yScale= d3.scaleLinear()
        .domain([0, d3.max(data, data=> data.healthcare)])
        .range([chartHeight, 0]);
    
    var xScale= d3.scaleLinear()
        .domain([0, d3.max(data, data=> data.poverty)])
        .range([0, chartWidth]);
    
    //create two new functions passing the scales in as arguments
    //these will be used to create the chart's axis
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    //Configure a Line function which will plot the x and y coordinates using our scale
    var drawLine = d3.line()
        .x(data => xScale(data.poverty))
        .y(data => yScale(data.healthcare));
    
    //set x axis
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);

    //set y axis
    chartGroup.append("g")
        .call(leftAxis);

    //Append Data to chartGroup
    chartGroup.selectAll(".circle")
        .data(data)
        .enter()
        .append("circle")
        .classed("circle", true)
        .attr("cx", (d,i) => xScale(data[i].poverty))
        .attr("cy", (d,i) => yScale(data[i].healthcare))
        .attr("r", "10")
        .attr("fill", "red");
});