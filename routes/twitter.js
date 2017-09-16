var express = require("express");
var router = express.Router();
var https = require("https");
var btoa = require("btoa");


var keys = {
    client: process.env.TWITTER_API,
    secret: process.env.TWITTER_SECRET
}

var combined = keys.client + ":" + keys.secret;
var base64encode = btoa(combined);

// fucntion getAccessToken(handleAccessTokenResponse){
    
// }