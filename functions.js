	var areas = ['ux', 'prog', 'stats', 'math', 'graphics', 'hci', 'ivis', 'art', 'learn'];
	var interests = ['music', 'books', 'games', 'sports', 'cooking', 'programming', 'creative', 'photography', 'society'];

	function bubbleChart() {
		// the viz area
		var width = 800;
		var height = 500;
		//console.log("bubbleChart func", height);

		//mouseover
		var tooltip = floatingTooltip('gates_tooltip', 240);

		// locations to move bubbles towards, depending on what mode is selected
		var center = {x: width/2, y: height/2};
		//console.log("center", center);
		var skillCenters = {
			"low": {x: width/3.9, y: height/2},
			"medium": {x: width/2, y: height/2},
			"high": {x: 2.3*width/3, y: height/2}
		};

		// x location of the skill level titles
		var skillTitleX = {
			"low": 100, 
			"medium": width/2,
			"high": width-100
		};

		var forceStrength = 0.03; // strengths to apply to the pos forces

		// these will be set in create_nodes adn create_vis
		var svg = null;
		var bubbles = null;
		var nodes = [];

		// charge is negative cuz we want nodes to repel
		function charge(d) {
			return -Math.pow(d.radius, 2.0) * forceStrength;
		}

		// create force simulation and add forces to it
		var simulation = d3.forceSimulation() // add new simulation + forces
		.velocityDecay(0.2) //works like friction
		.force('x', d3.forceX().strength(forceStrength).x(center.x))
		.force('y', d3.forceY().strength(forceStrength).y(center.y))
		.force('charge', d3.forceManyBody().strength(charge))
		.on('tick', ticked);

		simulation.stop(); // if one wants to hold off the simulation before creating more nodes

		var fillColor = d3.scaleLinear()
			.domain([1, 9])
			.interpolate(d3.interpolateHcl)
			.range(['#00BCD4', '#009688', '#795548', '#607D8B']);



		function createNodes (rawData) {
			//var maxAmount = d3.max(rawData, function (d) { return +d.total_amount; });
			//console.log("rawData", rawData);

			var radiusScale = d3.scalePow() // sizes bubbles based on area
				.exponent(0.5)
				.range([2, 85])
				.domain([0, 25]);

			myNodes = pumpNodes(rawData);

			return myNodes;

		}

		function pumpNodes(rawData) {
			var newNodes = rawData.map(function (d) {
			//console.log("d", d);
			var value = Math.floor(Math.random()*20)+5;

			function rad () {
					count = (parseInt(d.IVIS)+parseInt(d.Stats)+parseInt(d.Maths)+parseInt(d.Art)+parseInt(d.Learn)+parseInt(d.Prog)+parseInt(d.Graphics)+parseInt(d.HCI)+parseInt(d.UX))/9;
					return count;
			}

			var overall = knowledgeLevel(d, parseInt(rad()));
			//console.log("radddddddeeeeen", rad());
			var ivis = knowledgeLevel(d, "IVIS");
			var stats = knowledgeLevel(d, "Stats");
			var math = knowledgeLevel(d, "Maths");
			var art = knowledgeLevel(d, "Art");
			var learn = knowledgeLevel(d, "Learn"); 
			var prog = knowledgeLevel(d, "Prog");
			var graphics = knowledgeLevel(d, "Graphics");
			var hci = knowledgeLevel(d, "HCI");
			var ux = knowledgeLevel(d, "UX");

				return {
					id: parseInt(d.Num),
					radius: rad()*4,
					value: value,
					overall: overall,
					name: d.Alias, 
					interests: null,
					ivis: ivis,
					stats: stats,
					math: math,
					art: art, 
					learn: learn, 
					prog: prog,
					graphics: graphics,
					hci: hci,
					ux: ux,
					music: parseInt(d.Music),
					books: parseInt(d.Books),
					games: parseInt(d.games),
					sports: parseInt(d.Sports),
					cooking: parseInt(d.Cooking),
					programming: parseInt(d.programming),
					creative: parseInt(d.Creative),
					photography: parseInt(d.Photography),
					society: parseInt(d.Society),
					x: Math.random() * 900,
					y: Math.random() * 800
				}
			});

			//sort to prevent occlusion of smaller nodes.
			newNodes.sort(function (a, b) { return b.value - a.value;});
			//console.log("myNodes", newNodes);
			return newNodes;
		}

		function resetColors () {
			d3.selectAll('.bubble')
				.style('opacity', 1.0);
		}

		function updateNodes (displayName) {
			console.log("AND ON WE GO");

			resetColors();

			//console.log("updateNodes", d);
			console.log("NODES", nodes);
			for (i = 0; i < nodes.length; i++) {

				for (j = 15; j < 24; j++) {
					var nodd = nodes[i];

					if (isNaN(nodd[displayName])) {
						var noddStr = String(nodd.id);
						var noddStr = '#id'+noddStr;

						// #idVARIABEL

						d3.select(noddStr)
							.style('opacity', 0.2);
					}

					//console.log("propps", nodd[d]);
					// if(Object.keys(nodes[i])[j] === d){
					// 	if(isNaN())
					// }
				}
			}


		}

		function knowledgeLevel (d, cat) {
			var level;
			if (cat === "IVIS") {
				var count = parseInt(d.IVIS);
				if(count <= 1) {
					level = "low";
				} else if (count >=2 && count <=6) {
					level = "medium";
				} else if (count >=7) {
					level = "high";
				}
			} else if (cat === "Stats") {
				var count = parseInt(d.Stats);
				if(count <= 1) {
					level = "low";
				} else if (count >=2 && count <=6) {
					level = "medium";
				} else if (count >=7) {
					level = "high";
				}
			} else if (cat === "Maths") {
				var count = parseInt(d.Maths);
				if(count <= 2) {
					level = "low";
				} else if (count >=3 && count <=7) {
					level = "medium";
				} else if (count >=8) {
					level = "high";
				}
			} else if (cat === "Art") {
				var count = parseInt(d.Art);
				if(count <= 2) {
					level = "low";
				} else if (count >=3 && count <=7) {
					level = "medium";
				} else if (count >=8) {
					level = "high";
				}
			} else if (cat === "Learn") {
				var count = parseInt(d.Learn);
				if(count <= 5) {
					level = "low";
				} else if (count >=6 && count <=10) {
					level = "medium";
				} else if (count >=11) {
					level = "high";
				}
			} else if (cat === "Prog") {
				var count = parseInt(d.Prog);
				if(count <= 2) {
					level = "low";
				} else if (count >=3 && count <=7) {
					level = "medium";
				} else if (count >=8) {
					level = "high";
				}
			} else if (cat === "Graphics") {
				var count = parseInt(d.Graphics);
				if(count <= -1) {
					level = "low";
				} else if (count >=1 && count <=5) {
					level = "medium";
				} else if (count >=6) {
					level = "high";
				}
			} else if (cat === "HCI") {
				var count = parseInt(d.HCI);
				if(count <= 1) {
					level = "low";
				} else if (count >=2 && count <=6) {
					level = "medium";
				} else if (count >=7) {
					level = "high";
				}
			} else if (cat === "UX") {
				var count = parseInt(d.UX);
				if(count <= 2) {
					level = "low";
				} else if (count >=3 && count <=7) {
					level = "medium";
				} else if (count >=8) {
					level = "high";
				}
			} else if (cat <= 2) {
					level = "low";
					console.log("cat");
			} else if (cat >=3 && cat <=7) {
					level = "medium";
					console.log("cat1");
			} else if (cat >=8) {
					level = "high";
					console.log("cat2");
			}
			return level;
		}


		var chart = function chart(selector, rawData) {
			//convert raw data into nodes data
			nodes = createNodes(rawData);
			//console.log("chart nodes", nodes);

			//create SVG element inside provided selector with desired size
			svg = d3.select(selector)
				.append('svg')
				.attr('width', width)
				.attr('height', height);
				//console.log("height", height);

			//bind nodes data to what will become DOM elements to represent them
			bubbles = svg.selectAll('.bubble')
				.data(nodes, function (d) { return d.Num; });




			var bubblesE = bubbles.enter().append('circle')
				.classed('bubble', true)
				.attr('r', 0)
				.attr('fill', function (d) { return fillColor(d.value); })
				.attr('stroke', function (d) { return d3.rgb(fillColor(d.value)).darker(); })
				.attr('stroke-width', 2)
				.attr('id', function(d) {return 'id'+d.id;}) //assign unique id to each bubble
				.on('mouseover', showDetail)
				.on('mouseout', hideDetail);
				//.on('click', selectToGroup); select node to group
				

			//console.log("bubblesE", bubblesE);
			//console.log("bubbles", bubbles);
			bubbles = bubbles.merge(bubblesE); //merge the original empty selection and the enter selection


			//fancy transition of bubbles into view
			bubbles.transition()
				.duration(2000)
				.attr('r', function (d) { return d.radius; });

			//start simulation
			simulation.nodes(nodes);

			//set initial layout to single group
			groupBubbles();
		};


		// callback funtion that is called after every tick of the force sim.
		function ticked() { 
			bubbles
				.attr('cx', function (d) { return d.x; })
				.attr('cy', function (d) { return d.y; })
		}

		//provides x value for each node to be used with the split by skill level
		function nodeSkillPos(d) {
			var displayName = d3.select('.active').attr("id");
			//console.log("ADAMA", displayName);

			//console.log("d nodeSkillPos", d);
			//console.log("d displayName", displayName);


			for (var p = 6; p<15; p++){
				if (displayName == Object.keys(d)[p]){
					//console.log("dpppp", d[p]);
					var key = Object.keys(d)[p];
					
					return skillCenters[d[key]].x;
				}
			}
			//return skillCenters[d.displayName].x;
		}

		//single group mode, skill levels are hidden, tick function to move all nodes to center
		function groupBubbles() {
			hideSkillTitles();

			//var targetForceX = d3.forceX(function(d) {return targetFunction(d).x})
	        //.strength(+BUBBLE_PARAMETERS.force_strength);
	       	//var targetForceY = d3.forceY(function(d) {return targetFunction(d).x})
	       // .strength(+BUBBLE_PARAMETERS.force_strength);

			//reset x force to draw bubbles to center
			simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));
			//simulation.force('y', d3.forceX().strength(forceStrength).y(center.y));

			//reset alpha value and restart sim
			simulation.alpha(1).restart();
		}

		//split group mode, shows skill levels
		function splitBubbles(displayName) {
			showSkillTitles();

			//reset x force to draw bubbles to skill centers
			simulation.force('x', d3.forceX().strength(forceStrength).x(nodeSkillPos));

			//reset alpha value and restart sim
			simulation.alpha(1).restart();
		}

		

		//Hide skill title display
		function hideSkillTitles() {
			svg.selectAll('.overall').remove();
		}


		//Show skill title display
		function showSkillTitles() {
			var skillData = d3.keys(skillTitleX);
			var skills = svg.selectAll('.overall')
				.data(skillData);

			skills.enter().append('text')
				.attr('class', 'overall')
				.attr('x', function (d) { return skillTitleX[d]; })
				.attr('y', 40)
				.attr('text-anchor', 'middle')
				.text(function (d) { return d; })
				.on('mouseover', showExplanation)
				.on('mouseout', hideExplanation);
		}

		

		
		//called on mouseover to display additional details
		function showDetail (d) {
			//d3.select(this).attr('stroke', 'black');
			//console.log("mouseover");
			//console.log("mouseover d", d);
			d3.select(this)
				.attr('fill', '#FFB300')
			var content = '<span class="name">Name: </span><span class="value">' + d.name
			+'</span><br/>'
			+'<span class="name">Interests and hobbies: </span><br/><span class="value">$'
			+'</span><br/>';

			//console.log("content",content)
			tooltip.showTooltip(content, d3.event);
		}

		//called on mouseover to hide additional details
		function hideDetail (d) {
			d3.select(this)
				.attr('fill', function (d) { return fillColor(d.value); })
				.attr('stroke', function (d) { return d3.rgb(fillColor(d.value)).darker(); })
				.attr('stroke-width', 2) //gives back the original color

				console.log("switch back", this);

			tooltip.hideTooltip();
		}

		function showExplanation (d) {
			console.log("showExplanation", d);
			var text = '<span class="explanation"> Low, medium and high indicates on what level you are in relation to the class, ie. to be in the group "high" you dont necessarily have to be an expert, but you are among the best in the class in this specific area.</span>';

			tooltip.showTooltip(text, d3.event);
		}

		function hideExplanation (d) {
			d3.select(this)

			tooltip.hideTooltip();
		}

		function isInList(list, string) {
			for (i=0; i < list.length; i++) {
				if (list[i] == string) {
					return true
				}
			}
		}

		chart.toggleDisplay = function (displayName) {
			if (displayName === 'All') {
				groupBubbles(displayName);
				
				
			} else if (isInList(areas, displayName) === true) {
				splitBubbles(displayName);
				//console.log("dispName", displayName);
			} else if (isInList(interests, displayName) === true) {
				console.log("inListInterest");
				updateNodes(displayName);
			} else if (displayName === 'noInt') {
				resetColors();
			}
		};

		//return the chart funtion from closure
		return chart;
	}

	//initialization code
	var myBubbleChart = bubbleChart();

	//function called when data is loaded from csv
	function display (error, data) {
		if (error) {
			console.log(error);
		}
		myBubbleChart('#vis', data);
	}

	function secondButtonsClear() {
		d3.select('#interests')
			.selectAll('.btn', function() {
				d3.selectAll('.btn').classed('active', true);

				var button = d3.select(this);
				button.classed('active', false);
			})
	}

	function setupInterestButtons() {
		console.log("setupInterestButtons");
		d3.select('#interest')
			.selectAll('.btn-secondary')
			.on('click', function() {
				d3.selectAll('.btn-secondary').classed('active', false);
				console.log("click");
				var button = d3.select(this);
				console.log("button", button);

				button.classed('active', true);

				var buttonId = button.attr('id');
				console.log("buttonID", buttonId);



				myBubbleChart.toggleDisplay(buttonId);
			})
	}

	//sets up the layout buttons to allow for toggling between view modes
	function setupButtons() {
		console.log("setupButtons()");
		setupInterestButtons();
		d3.select('#toolbar')
			.selectAll('.btn-primary')
			.on('click', function () {
				//remove active class from all buttons
				d3.selectAll('.btn-primary').classed('active', false);
				//find the button just clicked
				var button = d3.select(this);
				console.log("button", button);

				//set it as the active button
				button.classed('active', true);

				//get the id of the button
				var buttonId = button.attr('id');

				//console.log("buttonID", buttonId);

				//toggle the bubble chart based on the currently clicked butt
				myBubbleChart.toggleDisplay(buttonId);
			});
	}

	//load the data

	d3.csv('data/dataivis.csv', display);

	//setup the buttons
	setupButtons();