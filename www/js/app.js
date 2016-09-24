// As JQuery will be used for majority of our JS code, you can attach it to the global scope
// Along with helpers such as mathJS and underscoreJS
global.$ = global.jQuery = require("jquery");
global.math = require('mathjs');
global._ = require("underscore");

// Any special library you want to use can be installed through npm and imported into the specifc files.
// Most of these may not need variables attached in order to use them, see their documentation.
require('bootstrap');
require('twbs-pagination');
require("blueimp-file-upload");
require("jquery-knob");

// Files that you create can also be included in any JS file, 
// however their path has to be specified as they are not part of NPM
var my_poll = require("./poll.js");



$(document).ready(function(){


    // example of how you can use your JS code in other files
    var poll_questions = ["Question A", "Question B", "Question C"];

    my_poll.init(poll_questions);

    var results = my_poll.getResults(poll_questions);

    console.log(results);


    //////////// DELETE FOLLOWING ON RELEASE ////////////

    var call_data_shown = false;
    $(".lti_call_data_button").click(function(){

        if(call_data_shown){
            $(".lti_call_data").hide();
            call_data_shown = false;
        }else{
            $(".lti_call_data").show();
            call_data_shown = true;
        }

    });

    /////////////////////////////////////////////////////

});

