module.exports = {
    watch: function(callback){

        storage.getWatchList(function(watchlist){

            urlsToTrack = watchlist;
            start(callback);

        })


    },
    update: function(newValue){

        urlsToTrack = newValue;

    }

}

var urlsToTrack = [];

function start(callback){

    chrome.webRequest.onCompleted.addListener(

        function(details) { 

            var tabid = details.tabId;

            var main_frame = details.type == "main_frame" ? true : false;

            if((tabid && (tabid > 0)) || (main_frame && (tabid && (tabid >= 0)))){

                chrome.tabs.get(tabid, function(tab){

                    if (!chrome.runtime.lastError) {

                        if(tab && (tab.active == true)){

                            updateLog(tab, callback);

                        }

                    } else {

                        console.log(chrome.runtime.lastError.message);

                    };

                })

            }


        },
        {urls: ["<all_urls>"]},
        ["responseHeaders"]

    );

    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab){

        if((tab.active == true) && (tab.status == "complete") && (changeInfo.status == "complete")){

            updateLog(tab, callback);

        }

    });

}

function updateLog(tab, callback){

    var domain = extractDomain(tab.url);

    var trackable = _.includes(urlsToTrack, domain);


    if(trackable){

        var timestamp = _.now();
        var time = new Date(timestamp);
        var seconds = Math.floor(time/1000);
        var minutes = Math.floor(seconds/60);
        //var minutestime = new Date(minutes*60*1000);

        storage.setLog(domain, minutes, function(){

            storage.getLog(domain, function(domainlog){
                console.log(domain, domainlog);
            });

        });


    }




}


function extractDomain(url) {

    var domain;

    var domain = url.indexOf("://") > -1 ? url.split('/')[2] : url.split('/')[0];

    domain = domain.split(':')[0];

    return domain;

}
