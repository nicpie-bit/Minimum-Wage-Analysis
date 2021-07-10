d3.selectAll("#familysize").on("change", createPlot);

// width and height of map
var width = 960;
var height = 500;

// formatting function
var moneyFormatter = d3.format("($.2f")

// coloring
var lowColor = '#2db5a4'
var highColor = '#440154'

// d3 projection
let projection = d3.geoAlbersUsa()
  .translate([width / 2, height / 2]) // translate to center of screen
  .scale([1000]); // scale things down so see entire US

// define path generator
let path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
  .projection(projection); // tell path generator to use albersUsa projection

function createPlot() {
	d3.selectAll("svg > *").remove();
	// create SVG element and append map to the SVG
	let svg = d3.select("body")
		.append("svg")
		.attr("width", width)
		.attr("height", height);
	// select element
	let dropdownMenu = d3.select("#familysize")
	let selectedData = dropdownMenu.property("value")
	// load in living wage data
	d3.csv("https://raw.githubusercontent.com/shalynalavoie/Minimum-Wage-Project/main/data/living.csv", function(data) {
		let dataArray = [];
		for (var d = 0; d < data.length; d++) {
			if (selectedData == "OneAdultZeroKids") {dataArray.push(parseFloat(data[d].OneAdultZeroKids))}
			else if (selectedData == "OneAdultOneKid") {dataArray.push(parseFloat(data[d].OneAdultOneKid))}
			else if (selectedData == "OneAdultTwoKids") {dataArray.push(parseFloat(data[d].OneAdultTwoKids))}
			else if (selectedData == "OneAdultThreeKids") {dataArray.push(parseFloat(data[d].OneAdultThreeKids))}
			else if (selectedData == "TwoAdultsZeroKids") {dataArray.push(parseFloat(data[d].TwoAdultsZeroKids))}
			else if (selectedData == "TwoAdultsOneKid") {dataArray.push(parseFloat(data[d].TwoAdultsOneKid))}
			else if (selectedData == "TwoAdultsTwoKids") {dataArray.push(parseFloat(data[d].TwoAdultsTwoKids))}
			else if (selectedData == "TwoAdultsThreeKids") {dataArray.push(parseFloat(data[d].TwoAdultsThreeKids))}
		};
		console.log(dataArray)
		let valRange = [10,20,30,40,50,60,70]
		let colRange = ["#fde725", "#95d840", "#29af7f", "#238a8d", "#33638d", "#482677", "#440154"]
		let ramp = d3.scaleLinear().domain(valRange).range(colRange)
		
	// load GeoJSON data and merge with wage data
	d3.json("https://raw.githubusercontent.com/shalynalavoie/Minimum-Wage-Project/main/data/us-states.json", function(json) {

		// loop through each state data value in the .csv file
		for (var i = 0; i < data.length; i++) {

		// grab State Name
		let dataState = data[i].State;

		// initialize dataValue
		let dataValue = 0
		// grab data value 
		if (selectedData == "OneAdultZeroKids") {dataValue = data[i].OneAdultZeroKids}
		else if (selectedData == "OneAdultOneKid") {dataValue = data[i].OneAdultOneKid}
		else if (selectedData == "OneAdultTwoKids") {dataValue = data[i].OneAdultTwoKids}
		else if (selectedData == "OneAdultThreeKids") {dataValue = data[i].OneAdultThreeKids}
		else if (selectedData == "TwoAdultsZeroKids") {dataValue = data[i].TwoAdultsZeroKids}
		else if (selectedData == "TwoAdultsOneKid") {dataValue = data[i].TwoAdultsOneKid}
		else if (selectedData == "TwoAdultsTwoKids") {dataValue = data[i].TwoAdultsTwoKids}
		else if (selectedData == "TwoAdultsThreeKids") {dataValue = data[i].TwoAdultsThreeKids}

		// find the corresponding state inside the GeoJSON
		for (var j = 0; j < json.features.length; j++) {
			let jsonState = json.features[j].properties.name;

			if (dataState == jsonState) {
			// copy the data value into the JSON
			json.features[j].properties.value = dataValue;
			// stop looking through the JSON
			break;
			}
		}
		}

	// bind the data to the SVG and create one path per GeoJSON feature
	dataGroup = svg.selectAll("path")
		.data(json.features)
		.enter()
		.append("path")
		.attr("d", path)
		.style("stroke", "#fff")
		.style("stroke-width", "1")
		.style("fill", function(d) { return ramp(d.properties.value) });
		
			// add a legend
			var w = 140, h = 300;

			var key = d3.select("body")
				.append("svg")
				.attr("width", w)
				.attr("height", h)
				.attr("class", "legend");

			var legend = key.append("defs")
				.append("svg:linearGradient")
				.attr("id", "gradient")
				.attr("x1", "100%")
				.attr("y1", "0%")
				.attr("x2", "100%")
				.attr("y2", "100%")
				.attr("spreadMethod", "pad");

			legend.append("stop")
				.attr("offset", "0%")
				.attr("stop-color", colRange[6])
				.attr("stop-opacity", 1);
			legend.append("stop")
				.attr("offset", "17%")
				.attr("stop-color", colRange[5])
				.attr("stop-opacity", 1);
			legend.append("stop")
				.attr("offset", "33%")
				.attr("stop-color", colRange[4])
				.attr("stop-opacity", 1);
			legend.append("stop")
				.attr("offset", "50%")
				.attr("stop-color", colRange[3])
				.attr("stop-opacity", 1);
			legend.append("stop")
				.attr("offset", "67%")
				.attr("stop-color", colRange[2])
				.attr("stop-opacity", 1);
			legend.append("stop")
				.attr("offset", "83%")
				.attr("stop-color", colRange[1])
				.attr("stop-opacity", 1);
			legend.append("stop")
				.attr("offset", "100%")
				.attr("stop-color", colRange[0])
				.attr("stop-opacity", 1);

			key.append("rect")
				.attr("width", w - 100)
				.attr("height", h)
				.style("fill", "url(#gradient)")
				.attr("transform", "translate(0,10)");

			var y = d3.scaleLinear()
				.range([h, 0])
				.domain([10, 70]);

			var yAxis = d3.axisRight(y);

			key.append("g")
				.attr("class", "y axis")
				.attr("transform", "translate(41,10)")
				.call(yAxis);

	let toolTip = d3.select("body").append("div")
					.attr("class", "tooltip")
	
	dataGroup.on("mouseover", function(d, i) {
		toolTip.style("display", "block");
		toolTip.html(`${json.features[i].properties.name}<br>${moneyFormatter(json.features[i].properties.value)}`)
			.style("left", d3.event.pageX + "px")
			.style("top", d3.event.pageY + "px")
	})
	.on("mouseout", function(){
		toolTip.style("display", "none")
	})
	});
	});
}

createPlot();

