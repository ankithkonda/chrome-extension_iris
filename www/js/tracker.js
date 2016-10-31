var _url = require('url');

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

const watchlistKey = "watchlist";
const logKey = "log";

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

    // var urlList = extractUrls(tab.url);
    // var trackable = false;

    // var url = "";
    // $.each(urlsToTrack, function(ind, toTrackUrl){

    //     if(_.includes(urlList, toTrackUrl) || _.includes(urlList, toTrackUrl+"/") || _.includes(urlList, toTrackUrl.substring(0, toTrackUrl.length - 1)) || _.includes(urlList, "www."+toTrackUrl)){
    //         url = toTrackUrl;
    //         trackable = true;
    //     }

    // });


    var domainDetails = extractDetails(tab.url);


   // if(trackable){

    var timestamp = _.now();
    var time = new Date(timestamp);
    var seconds = Math.floor(time/1000);
    var minutes = Math.floor(seconds/60);
    //var minutestime = new Date(minutes*60*1000);
    
   // storage.set("watchlist", )


    storage.setLog(url, minutes, function(){

        storage.getLog(url, function(domainlog){
            //console.log(url, domainlog);
        });

    });

   // }


}

function extractDetails(url){

    var domain = null;

   // console.log("hek: ",_url.parse(url, false, false));

    return _url.parse(url, false, false);
   
}

function extractUrls(url) {

    var prom = [];

    var build = "";

    if(url.split("/").length <= 4){

        build = url.split("/")[2];

        prom.push(build);

        build += "/"+url.split("/")[3];

        prom.push(build);

    }else{

        for (var i = 2; i < (url.split("/").length); i++) {

            if(i > 2){

                build += "/"+url.split('/')[i];
            }else{

                build += url.split('/')[i];

            }

            prom.push(build);

        }


    }

    return prom;

}
