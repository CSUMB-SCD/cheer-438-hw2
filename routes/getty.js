var express = require('express');
var router = express.Router();
var express = require('express');
var router = express.Router();

/* GET users listing. */

var topic = 'car';
//do bin/www to launch!!!
/* GET home page. */


function makeTwitterRequest(sendBackTwitter){
    
}

function makeAPIrequest(sendBackResp ){  //calls sendback at end
    
    module.exports = router;
    var https = require('https');
    
    
    //build API call
    const options = {
        hostname:'api.gettyimages.com',
        port: 443,
        path: '/v3/search/images?phrase=' + topic,
        method: 'GET',
        headers: {
            'Api-Key': process.env.GETTY_API
        }
    };
    
    
    var apiResponse = '';
    
    //send call for callback
    https.get(options, function(reponse){
        reponse.on('data', function(chunk){ //when we get a response add to the apiresponse
            apiResponse+= chunk;        //chuck is the returned info
        });
        
        reponse.on('end',function(){
          console.log("status code: " + this.statusCode);
          console.log("Complete response: " + apiResponse);
                   
          //callback return
            sendBackResp(apiResponse);
        });
    }).on("error", function(e){
        console.on("got error: " + e.message); 
    });
    
}

router.get('/', function(req, res, next) {
    
    
    var tweet = "";
    var image = "";
    
    //send the API call and parse the response
    makeAPIrequest(function(apiResp){

        res.send(apiResp); //body of callback
        
    });
    
    
});

module.exports = router;
