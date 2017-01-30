var group1 = [];
var group2 = [];
var group3 = [];
var group4 = [];
var group5 = [];
var group6 = [];
var group7 = [];
var group8 = [];
var group9 = [];
var group10 = [];

function groupChart() {
	//size of area
	var width = 800; 
	var height = 400;

	//mouseover
	var tooltip = floatingTooltip('gates_tooltip', 240);

	var placement = {
		"group1": {x: width/20, y: height/2},
		"group2": {x: width/18, y: height/2},
		"group3": {x: width/16, y: height/2},
		"group4": {x: width/14, y: height/2},
		"group5": {x: width/2, y: height/2},
		"group6": {x: width/2.5, y: height/2},
		"group7": {x: width/8, y: height/2},
		"group8": {x: width/6, y: height/2},
		"group9": {x: width/4, y: height/2},
		"group10": {x: width/2, y: height/2}
	};

	var forceStrength = 0.03;

	var svg = null;
	var groupBubbles = null;
	var nodes = [];

	function charge(d) {
		return -Math.pow(d.radius, 2.0)*forceStrength;
	}

	var simulation = d3.forceSimulation()
		.velocityDecay(0.2)
		.force('x', d3.forceX().strength(forceStrength).x(placement.x))
		.force('y', d3.forceY().strength(forceStrength).y(placement.y))
		.force('charge', d3.forceManyBody().strength(charge))
		.on('tick', ticked);

	simulation.stop();

	var chart = function chart(selector, rawData) {

		//we need the node clicked

		svg = d3.select(selector)
			.append('svg')
			.attr('width', width)
			.attr('height', height);

		//in functions => bubbles = svg.selectAll...
	}

	function updateChart(d) {
		console.log("updateChart d", this);
	}

	function ticked() {
		groupBubbles
			.attr('cx', function(d) { return d.x})
			.attr('cy', function(d) { return d.y})
	}


}

var myGroupChart = groupChart();

function display (error, data) {
	if (error) {
		console.log(error);
	}
	console.log("beginning");
	myGroupChart('#groupVis', data)
}

display(); //initialize