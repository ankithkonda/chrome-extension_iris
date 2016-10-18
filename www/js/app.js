// As JQuery will be used for majority of our JS code, you can attach it to the global scope
// Along with helpers such as mathJS and underscoreJS
global.$ = global.jQuery = require("jquery");
global._ = require("lodash");
global.storage = require("./storage.js");
global.d3 = require("d3");
// Any special library you want to use can be installed through npm and imported into the specifc files.
// Most of these may not need variables attached in order to use them, see their documentation.
require('bootstrap');
require('twbs-pagination');
require("blueimp-file-upload");
require("jquery-knob");

var Handlebars = require('handlebars');



// Files that you create can also be included in any JS file, 
// however their path has to be specified as they are not part of NPM
//var my_poll = require("./poll.js");



$(document).ready(function(){

	$(".container").html(new Date(_.now()));


	chrome.tabs.query({active: true, currentWindow: true}, function(arrayOfTabs) {

		// since only one tab should be active and in the current window at once
		// the return variable should only have one entry
		var activeTab = arrayOfTabs[0];
		var activeTabId = activeTab.id; // or do whatever you need

		$(".urlToAdd").attr("value", extractDomain(activeTab.url));

  	});

	$(".addURLButton").click(function(e){

		e.preventDefault();

		var url = $(".urlToAdd").val();

		storage.set("watchlist", [url], function(){

			updatePopup();

		});

	});

	updatePopup();


	function updatePopup(){


		$(".watchlist").find("pre").html("");
		$(".log").find("pre").html("");
		$(".pie").html("");
		$(".removeclear").html("");



		storage.get("watchlist", function(items){

			if(items){
				if(items.length > 0){
					$(".watchlist").find("pre").html(JSON.stringify(items,null,2));
					loadLog(items);
					addRemoveURLlist(items);
				}
			}

		});




		function loadLog(items){
			var allLog = {};
			var data = [];
			var itemslen = items.length;
			var currentlen = 0;
			$.each(items,function(ind, obj){



				storage.get(obj, function(items){


					currentlen++;

					allLog[obj] = items;

					if(items){

						var pie = {};
						pie["url"] = obj;
						pie["minutes"] = items.length;
						data.push(pie);

					}

					if(currentlen == itemslen){

						$(".log").find("pre").html(JSON.stringify(allLog,null,2));
						generatePie(data);
						
					}
					
				});

			});

		}

		function addRemoveURLlist(items){


			var source =	'<select id="url_to_remove_select">'+
								  '{{#.}}<option value="{{.}}">{{.}}</option>{{/.}}'+
								'</select><button type="button" class="btn btn-warning btn-sm remove_button">Remove URL</button><button type="button" class="clear_button btn btn-danger btn-sm">Clear all</button>';

		    var template = Handlebars.compile(source);

		    var result = template(items);

		    $(".removeclear").html(result);

		    $(".remove_button").click(function(e){

				e.preventDefault();

				var url = $("#url_to_remove_select").val();

				console.log(url);

				storage.removeItem("watchlist", [url], function(){

					updatePopup();

				});

			});

		    $(".clear_button").click(function(event){

				chrome.storage.local.clear(function() {
				    var error = chrome.runtime.lastError;
				    if (error) {
				        console.error(error);
				    }
				    updatePopup();

				});

			});
			

		}


		function generatePie(dat){

				var width = 960,
			    height = 500,
			    radius = Math.min(width, height) / 2;

			var color = d3.scale.category10();

			var arc = d3.svg.arc()
			    .outerRadius(radius - 10)
			    .innerRadius(0);

			var labelArc = d3.svg.arc()
			    .outerRadius(radius - 40)
			    .innerRadius(radius - 40);

			var pie = d3.layout.pie()
			    .sort(null)
			    .value(function(d) { return d.minutes; });

			var svg = d3.select(".pie").append("svg")
			    .attr("width", width)
			    .attr("height", height)
			  .append("g")
			    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


			 //data = JSON.parse(dat);

			 data = $.parseJSON(JSON.stringify(dat));

			// parseJSON(JSON.stringify(data));

			console.log(data);
			  var g = svg.selectAll(".arc")
			      .data(pie(data))
			    .enter().append("g")
			      .attr("class", "arc");

			  g.append("path")
			      .attr("d", arc)
			      .style("fill", function(d) { return color(d.data.url); });

			  g.append("text")
			      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
			      .attr("dy", ".35em")
			      .text(function(d) { return d.data.url; });
			

			function type(d) {
			  d.minutes = +d.minutes;
			  return d;
			}


		}

		


	}



	$(".testA_button").click(function(event){

			console.log("button a pressed");
			storage.get("watchlist", function(items){

				$(".printarea").html("Get Current Watchlist"+"<br><br>"+JSON.stringify(items));


			})

				storage.get("watchlist", function(items){


		$.each(items, function(ind, obj){


			storage.get(obj, function(items){

				console.log(obj);

				console.log($("."+obj).html());

			
			})


		})


	});

	});

	$(".testB_button").click(function(event){

		console.log("set");
		storage.set("watchlist", ["www.reddit.com", "www.macrumors.com"], function(){


		});

	});

	$(".testC_button").click(function(event){

		storage.remove("watchlist", ["www.reddit.com"], function(){



		});

	});

	



});



function extractDomain(url) {

    var domain;

   // var domain = url.indexOf("://") > -1 ? url.split('/')[2] : url.split('/')[0];

   	domain = url.replace(/^https?\:\/\//i, "");

   	console.log("GA");

    return domain;

}

