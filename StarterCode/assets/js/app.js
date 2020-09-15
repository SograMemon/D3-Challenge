//define makeresponsive function
function makeResponsive(){
    //check if svg is empty if not empty remove existing content
    var svgArea= d3.select("#scatter").select("svg");
    if(!svgArea.empty()){
        svgArea.remove();
    }
    //Define SVG heigh and width
    var svgWidth= window.innerWidth*0.75;
    var svgHeight = window.innerHeight*0.75;

    //Define the charts margine as an object
    var chartMargin= {
        top: 50,
        right: 50,
        bottom: 60,
        left: 60
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
            .domain([d3.min(data, data=> data.healthcare)-1, d3.max(data, data=> data.healthcare)])
            .range([chartHeight, 0]);
        
        var xScale= d3.scaleLinear()
            .domain([d3.min(data, data=> data.poverty)-1, d3.max(data, data=> data.poverty)])
            .range([0, chartWidth]);
        
        //create two new functions passing the scales in as arguments
        //these will be used to create the chart's axis
        var bottomAxis = d3.axisBottom(xScale);
        var leftAxis = d3.axisLeft(yScale);
        
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
            .attr("fill", "blue");

        chartGroup.append("text")
            .attr("transform", `translate(${0-chartMargin.left/3}, ${chartHeight/2}), rotate(-90)`)
            .attr("text-anchor", "middle")
            .attr("font-size", "16px")
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .text("Lack of Healthcare %")

        chartGroup.append("text")
            .attr("transform", `translate(${chartWidth/2}, ${chartHeight+ chartMargin.top - 10})`)
            .attr("text-anchor", "middle")
            .attr("font-size", "16px")
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .text("in Poverty %")
    });
}

makeResponsive();
// Event listener for window resize.
// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);
