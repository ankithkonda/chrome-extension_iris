global.$ = global.jQuery = require("jquery");
global._ = require("lodash");
global.storage = require("./storage.js");

var tracker = require("./tracker.js");


storage.setWatchList(["www.reddit.com", "www.macrumors.com"], watchlistHasSet);


function watchlistHasSet(){

	tracker.watch(seen);

}

//tracker.watch(storage.getWatchList(), seen);

function seen(details){

	console.log("details: ", details);

}
