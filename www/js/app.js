// As JQuery will be used for majority of our JS code, you can attach it to the global scope
// Along with helpers such as mathJS and underscoreJS
global.$ = global.jQuery = require("jquery");
global._ = require("lodash");
global.storage = require("./storage.js");
// Any special library you want to use can be installed through npm and imported into the specifc files.
// Most of these may not need variables attached in order to use them, see their documentation.
require('bootstrap');
require('twbs-pagination');
require("blueimp-file-upload");
require("jquery-knob");


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

		extractDomainB(activeTab.url);


  	});




	// storage.get("watchlist", function(items){

	// 	$(".watchlist").find("pre").html(JSON.stringify(items,null,2));
	// 	loadLog(items);

	// });




	// function loadLog(items){
	// 	var allLog = {};
		
	// 	var itemslen = items.length;
	// 	var currentlen = 0;
	// 	$.each(items,function(ind, obj){

	// 		storage.get(obj, function(items){
	// 			currentlen++;

	// 			allLog[obj] = items;
	// 			if(currentlen == itemslen){

	// 				$(".log").find("pre").html(JSON.stringify(allLog,null,2));

					
	// 			}
	// 		});

	// 	});

	// }

	// // setInterval(function(){
	// // 	chrome.storage.local.get("tracked_urls", function(items){

	// // 		$(".tracked").html(JSON.stringify(items));

	// // 	});

	// // }, 500);
	// // 
	// // 





	// $(".testA_button").click(function(event){

	// 		console.log("button a pressed");
	// 		storage.get("watchlist", function(items){

	// 			$(".printarea").html("Get Current Watchlist"+"<br><br>"+JSON.stringify(items));


	// 		})

	// 			storage.get("watchlist", function(items){

	// 	console.log("red");

	// 	$.each(items, function(ind, obj){


	// 		storage.get(obj, function(items){

	// 			console.log(obj);

	// 			console.log($("."+obj).html());

			
	// 		})


	// 	})


	// });

	// });

	// $(".testB_button").click(function(event){

	// 	console.log("set");
	// 	storage.set("watchlist", ["www.reddit.com", "www.macrumors.com"], function(){


	// 	});

	// });

	// $(".testC_button").click(function(event){

	// 	storage.remove("watchlist", ["www.reddit.com"], function(){



	// 	});

	// });

	$(".clear_button").click(function(event){

		chrome.storage.local.clear(function() {
		    var error = chrome.runtime.lastError;
		    if (error) {
		        console.error(error);
		    }
		});

	});

});

function extractDomainA(url) {

    var domain;

    var domain = url.indexOf("://") > -1 ? url.split('/')[2] : url.split('/')[0];

    domain = domain.split(':')[0];

    return domain;

}

function extractDomain(url) {

    var domain;

   // var domain = url.indexOf("://") > -1 ? url.split('/')[2] : url.split('/')[0];

   	domain = url.replace(/^https?\:\/\//i, "");

   	console.log("GA");

    return domain;

}



function extractDomainB(url) {

    var domain;

    var domain = url.indexOf("://") > -1 ? url.split('/')[2] : url.split('/')[0];

    domain = domain.split(':')[0];

    var prom = [];

    var build = "";

    for (var i = 2; i < (url.split("/").length-1); i++) {


    	if(i > 2){

    		build += "/"+url.split('/')[i];
    		prom.push(build+"/");

    	}else{

    		build += url.split('/')[i];
    		prom.push(build);


    	}

    	//prom.push(build+"/");

    }

    $(".test").html((url.split("/").length-1)+", "+JSON.stringify(prom,null,2));

   //	$(".test").html(url.indexOf("/")+", "+url.split('/')[4]+", "+url.split('/')[3]+", "+url.split('/')[2]);

}

