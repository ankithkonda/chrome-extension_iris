

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
    setLog: function(domain, minutestamp, callback){

    	setLogToStorage(domain, minutestamp, callback);

    },
    watch: function(key, callback){

    	watchStorage(key, callback);

    },
    get: function(key, callback){

    	getFromStorage(key, callback);

    },
    set: function(key, items,  callback){

    	setToStorage(key, items, callback);

    },
    remove: function(key, callback){

    	removeFromStorage(key, callback);

    },
    removeItem: function(key, items, callback){

    	removeItemsFromKey(key, items, callback);

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

			//console.log(domainlog, minutestamp);


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

function getFromStorage(key, callback){

	chrome.storage.local.get(key, function(items){

		key ? callback(items[key]) : callback(items);

	})

}

function setToStorage(key, items, callback){

	chrome.storage.local.get(key, function(existingItems){

		if(existingItems[key]){

			var newItems = _.union(existingItems[key], items);

			setWatchListToStorage(newItems, function(){

				callback();

			});

		}else{

			setWatchListToStorage(items, function(){

				callback();

			});
		}

	})

}

function removeFromStorage(key, callback){

	chrome.storage.local.remove(key, function(){

		callback();

	});

}

function removeItemsFromKey(key, items, callback){


	chrome.storage.local.get(key, function(existingItems){

		console.log(existing);

		if(existingItems[key]){

			var existing = existingItems[key];

			_.pullAll(existing, items);
			
			var newItems = {};
			
			newItems[key] = existing;

			console.log(newItems);

			chrome.storage.local.set(newItems, function(){

				callback();

			});

		}else{

			callback();

		}

	})


}

function watchStorage(key, callback){

	console.log(key);

	chrome.storage.onChanged.addListener(function(changes, areaName){

		if(changes[key]){
			callback(changes[key].newValue, changes[key].oldValue);
		}

	});

}

