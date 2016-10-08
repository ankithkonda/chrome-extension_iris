global.$ = global.jQuery = require("jquery");
global._ = require("lodash");
global.storage = require("./storage.js");

var tracker = require("./tracker.js");






//tracker.watch(storage.getWatchList(), seen);
tracker.watch(["www.reddit.com", "www.macrumors.com"], seen);

function seen(details){

	console.log("details: ", details);

}
