global.$ = global.jQuery = require("jquery");
global._ = require("lodash");
global.storage = require("./storage.js");

var tracker = require("./tracker.js");



tracker.watch(seen);

storage.watch("watchlist", function(newValue, oldValue){

	tracker.update(newValue);

});


function seen(details){

	console.log("details: ", details);

}
