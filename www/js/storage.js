module.exports = {

    getWatchList: function(callback){

    	getWatchListFromStorage(callback);

    },
    setWatchList: function(watchlist, callback){

    	setWatchListToStorage(watchlist, callback);

    },
    getLog: function(domain, callback){

    	getLogFromStorage(domain, callback);

    },
    setLog:function(domain, minutestamp, callback){

    	setLogToStorage(domain, minutestamp, callback);

    }
}

function getWatchListFromStorage(callback){

	chrome.storage.local.get("watchlist", function(details){

		callback(details.watchlist);

	});

}


function getLogFromStorage(domain, callback){

	chrome.storage.local.get(domain, function (result) {

		callback(result[domain]);

	});

}

function setWatchListToStorage(watchlist, callback){

	console.log("setting watchlist to storage");

	var list = {};

	list["watchlist"] = watchlist;

	chrome.storage.local.set(list, function(){

		callback();

	});


}

function setLogToStorage(domain, minutestamp, callback){


	getLogFromStorage(domain, function(domainlog){

		var newLog = {};

		if(domainlog){

			domainlog.push(minutestamp);

			domainlog = $.unique(domainlog);

			console.log(domainlog, minutestamp);


			newLog[domain] = domainlog;

			chrome.storage.local.set(newLog, function(){
				callback();
			});

		}else{

			newLog[domain] = [minutestamp];

			chrome.storage.local.set(newLog, function(){
				callback();
			});

		}

	});




}