// As JQuery will be used for majority of our JS code, you can attach it to the global scope
// Along with helpers such as mathJS and underscoreJS
global.$ = global.jQuery = require("jquery");
global._ = require("underscore");

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

	$(".container").html("BLAH");


setInterval(function(){
	chrome.storage.local.get("tracked_urls", function(items){

		$(".tracked").html(JSON.stringify(items));

	});

}, 500);


	$(".testA_button").click(function(event){

		var urls = {"urls":["www.facebook.com", "www.reddit.com"]};

		chrome.storage.local.set(urls, function(){

			$(".container").append(JSON.stringify(urls));

		});

	});

	$(".testB_button").click(function(event){

		var urls = {"urls":["www.macrumors.com", "www.onemorelevel.com"]};

		chrome.storage.local.set(urls, function(){

				$(".container").append(JSON.stringify(urls));

		});

	});

	$(".testC_button").click(function(event){

		var urls = {"urls":["www.news.com.au", "www.uq.edu.au"]};

		chrome.storage.local.set(urls, function(){

				$(".container").append(JSON.stringify(urls));

		});

	});

});

