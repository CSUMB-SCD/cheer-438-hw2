var express = require("express");
var router = express.Router();
var https = require("https");
var btoa = require("btoa");


var keys = {
    client: process.env.TWITTER_API,
    secret: process.env.TWITTER_SECRET
}

var combined = keys.client + ":" + keys.secret;
var base64encode = btoa(combined);  //create the base64 encoded string using consumer and secret keys

//get the access token from twitter, so we then can make calls to twitter
function getAccessToken(handleAccessTokenResponse){
     const options = {
        hostname:'api.twitter.com',
        port: 443,
        path: '/oath2/token',
        method: 'POST',
        headers: {
            'Authorization' : 'Basic ' + base64encode,
            'Content-Type' : 'application/x-www-form-urlendcoded;charset=UTF-8'
        }
    };
    
    
    var postData = 'grant_type=client_credentials';
    var completeTwitterResponse= '';
    
    //set up the request
    var postReq = https.request(options, function(res){
       res.setEncoding('utf8');
       res.on('data',function(chunk){
           //once we get a return from twitter, we throw back the chunk into a string
           completeTwitterResponse += chunk;    //this holds the token we need
       });
       
       res.on('end',function(){
           console.log("++++++ TWITTER TOKEN RETURN +++++++");
           console.log("Status code: " + this.statusCode);
           var twitterResponseJSON = JSON.parse(completeTwitterResponse);   //parse the json to get the access token
           var accessToken = twitterResponseJSON.access_token;  //pull out the token
           
           handleAccessTokenResponse(accessToken);
       });
        
    });
    
    postReq.write(postData);
    postReq.end();
}

function makeTwitterRequest(sendBackTwitter){
    
}