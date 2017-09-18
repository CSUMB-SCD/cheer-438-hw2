var express = require("express");
var router = express.Router();
var https = require("https");
var btoa = require("btoa");

var searchTerm = "potato";

var keys = {
    client: process.env.TWITTER_API,
    secret: process.env.TWITTER_SECRET
};

var combined = keys.client + ":" + keys.secret;
var base64encode = btoa(combined);  //create the base64 encoded string using consumer and secret keys

//get the access token from twitter, so we then can make calls to twitter
function getAccessToken(handleAccessTokenResponse){
     const options = {
        hostname:'api.twitter.com',
        port: 443,
        path: '/oauth2/token',
        method: 'POST',
        headers: {
            'Authorization' : 'Basic ' + base64encode,
            'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    };
    
    //console.log(base64encode);
    
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

function makeTwitterRequest(accessToken, sendResponseToBrowser){
    const options2 = {
        hostname: 'api.twitter.com',
        port: 443,
        path: '/1.1/search/tweets.json?count=100&lang=en&q=' + searchTerm,
        method: 'GET',
        headers:{
            'Authorization': 'Bearer ' + accessToken
        }
        
    };
    // console.log(options2)
    
    var completeTwitterResponse = '';
    
    //set up request
    var twitterRequest = https.request(options2, function(twitterResponse){
        twitterResponse.setEncoding('utf8');
        twitterResponse.on('data', function(chunk){
           completeTwitterResponse += chunk;
        });
    
        twitterResponse.on('end', function(){
            console.log("++++++ TWITTER Q RETURN +++++++");
            console.log("Status Code: " + this.statusCode);
            
            var responseJSON = JSON.parse(completeTwitterResponse);
            var tweetsList = responseJSON.statuses;
            console.log("num Tweets: " + tweetsList.length )
            var twit = Math.floor(Math.random() * tweetsList.length); 
            var tweet = tweetsList[twit];
            
            
            sendResponseToBrowser(tweet);
        });
    });
    
    twitterRequest.end();
}


function makeGettyRequest(sendBackGetty ){  //calls sendback at end
    
    module.exports = router;
    var https = require('https');
    
    //https://api.gettyimages.com/v3/search/images?exclude_nudity=true&minimum_size=medium&orientations=horizontal%2Csquare&page_size=50&phrase=car
    //build API call
    const options = {
        hostname:'api.gettyimages.com',
        port: 443,
        path: '/v3/search/images?exclude_nudity=true&fields=comp&license_models=royalty_free&orientations=horizontal%2Csquare&page_size=100&phrase=' + searchTerm,
        method: 'GET',
        headers: {
            'Api-Key': process.env.GETTY_API
        }
    };
    
    
    var apiGettyResponse = '';
    
    //send call for callback
    https.get(options, function(reponse){
        reponse.on('data', function(chunk){ //when we get a response add to the apiresponse
            apiGettyResponse+= chunk;        //chuck is the returned info
            
            
            
        });
         
        reponse.on('end',function(){
            console.log("status code: " + this.statusCode);
            //console.log("Complete response: " + apiGettyResponse);
            var gettyResponseJSON = JSON.parse(apiGettyResponse);
            var images = gettyResponseJSON.images;
            //console.log(gettyResponseJSON);
            var choice = Math.floor(Math.random() * images.length); 
            console.log("num images: " + images.length + " ChosenIndex: " + choice);
            var sizesCount = images[choice].display_sizes.length;
            console.log("chosen image sizes: " + sizesCount);
            //console.log("url of first Image: " + images[0].display_sizes[0]);
            var imageURI = images[choice].display_sizes[sizesCount-1].uri;
                   
          //callback return
            sendBackGetty(imageURI);
        });
    }).on("error", function(e){
        console.on("got error: " + e.message); 
    });
    
}




router.get('/', function(req, res, next) {
    
    
 

    
     getAccessToken(function(accessToken){
        makeTwitterRequest(accessToken, function(tweet){
    
            //console.log("num Tweets: " + tweets.length )
            
            //res.render('twitter', {tweetsList: tweet});
            makeGettyRequest(function(gettyURL){
           
            
                console.log("Twitter set: " + tweet);
                console.log("getty set: " + gettyURL);
                res.render('twitter',{gettyURL: gettyURL, tweet: tweet});
                // res.render('index', { title: 'Express', className: "CST338"});
            
                //res.render('gettyURL',{gettyURL: gettyURL});
            
            });
        });
    });
    
      //send the API call and parse the response
   
});

module.exports = router;
