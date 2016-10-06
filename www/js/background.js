global.$ = global.jQuery = require("jquery");
global._ = require("lodash");





// chrome.storage.local.clear(function() {
//     var error = chrome.runtime.lastError;
//     if (error) {
//         console.error(error);
//     }
// });


chrome.storage.local.get("tracked_urls", function(items){

	run(items.tracked_urls);

})




function run(items){

var websites = items;

chrome.storage.onChanged.addListener(function(changes, area){



	if(area == "local" && changes.urls){
		chrome.storage.local.get("tracked_urls", function(items){

			if(changes.urls){

				var combined = _.union(items.tracked_urls, changes.urls.newValue);

				var tracked = {"tracked_urls":combined};

				chrome.storage.local.set(tracked, function(){
					websites = combined;
				});

			}

		});
	}else if(area == "local" && changes.visit_log){


		chrome.storage.local.get("visit_log", function(items){

			console.log("_______ LOG: ", items);	

		});
	}

	//console.log(_.merge(changes.urls.newValue, changes.urls.oldValue));

	// if(websites != _.merge(changes.urls.newValue, changes.urls.oldValue)){

	// }


});


 chrome.webRequest.onCompleted.addListener(

        function(details) { 

        	var tabid = details.tabId;



        	if(tabid > 0){
	        	chrome.tabs.get(tabid, function(tab){
	        		//console.log(tab)

	        		if (chrome.runtime.lastError) {
			        	//console.log(chrome.runtime.lastError.message);
				    } else {
				    	//console.log(tab);
				    	if(tab){
			        		if(tab.active == true){

			        			checkURL(tab.url, Date.now(), function(url, timestamp){

						 			verdict(url, timestamp);

						 		});

			        		}
	        			}

				    };
	        		
	        	})
	        }
        	if(details.type == "main_frame"){
		 		checkURL(details.url, Date.now(), function(url, timestamp){

		 			console.log("Main Frame started")
		 			verdict(url, timestamp);

		 		});
		 	}
        },
        {urls: ["<all_urls>"]},
        ["responseHeaders"]

 );


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab){


	if((tab.active == true) && (tab.status == "complete") && (changeInfo.status == "complete")){

		checkURL(tab.url, Date.now(), function(url, timestamp){

		 	verdict(url, timestamp);

		 });

	}

})


 function checkURL(url, timestamp, callback){

 	callback(url, timestamp);
 	
 }

 function verdict(url, timestamp){

 	var time = Date(timestamp*1000);
 	var seconds = Math.round(timestamp/1000);
 	var minutes = Math.round(seconds/60);
 	var domain = extractDomain(url);

 	//console.log(websites);
 	if(_.includes(websites, domain)){

		if(visit_log[domain]){

			if(!_.includes(visit_log[domain]["minutes"], minutes)){

				visit_log[domain]["minutes"].push(minutes);
				visit_log[domain]["datetime"].push(time);
				visit_log[domain]["timestamp"].push(timestamp);


				chrome.storage.local.set({"visit_log":visit_log}, function(){});


			}

		}else{

			visit_log[domain] = {"minutes":[minutes], "datetime":[time], "timestamp":[timestamp]};
			chrome.storage.local.set({"visit_log":visit_log}, function(){});


		}


		//visit log updates however need to append rather than replace if the website already exists in the localstorage
	}

 }

 var lastArraySize = 0;

 setInterval(function(){


 	chrome.tabs.getSelected(null, function(tab) {
        //var tab = tab.id;
        //tabUrl = tab.url;

       // console.log(tab);
    });

 	//console.log(visit_log);

 },1000);



var visit_log = {};

 function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}


}




