module.exports = {
    watch: function(urls, callback){

        urlsToTrack = urls;
        start(callback);

    },
    addURLs: function(urls){

    }

}

var urlsToTrack = [];

function start(callback){

    chrome.webRequest.onCompleted.addListener(

        function(details) { 

            var tabid = details.tabId;

            var main_frame = details.type == "main_frame" ? true : false;

            if((tabid && (tabid > 0)) || main_frame){

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

        storage.setLog(domain, minutes);

        //console.log(domain,'\n',time,'\n',timestamp,'\n',seconds,'\n', minutes, '\n',minutestime);
        //console.log("expected :", "Sat Oct 08 2016 23:41:33 GMT+1000 (AEST)");
        //console.log("got :", new Date(24598901*60*1000), 24598901);
        //console.log("timestamp :",Date(timestamp*1000), timestamp);
       // callback({"status":"added to log", "tab":tab})

    }




}


function extractDomain(url) {

    var domain;

    var domain = url.indexOf("://") > -1 ? url.split('/')[2] : url.split('/')[0];

    domain = domain.split(':')[0];

    return domain;

}
