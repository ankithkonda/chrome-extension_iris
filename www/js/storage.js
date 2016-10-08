module.exports = {

    getWatchList: function(){

    	return getWatchListFromStorage();

    },
    setWatchList: function(watchlist){

    	setWatchListToStorage();

    },
    getLog: function(){

    	return getLogFromStorage();

    },
    setLog:function(domain, minutestamp){

    	setLogToStorage(domain, minutestamp);

    }
}

//urls to track
//log of visits

function getWatchListFromStorage(){


	return ["watch","list"];

}


function getLogFromStorage(){


	return ["log","list"];

}

function setWatchListToStorage(){

	console.log("setting watchlist to storage");

}

function setLogToStorage(domain, minutestamp){

	console.log("setting log to storage", domain, minutestamp);
	// console.log($.type(domain));
	// console.log($.type("www.reddit.com"));
	// var stringDomain = domain.toString();
	var log = {};

	log[domain] = [minutestamp];

	chrome.storage.local.set(log, function(){

			chrome.storage.local.get(domain, function (result) {

				console.log(result);

			});

	});








}