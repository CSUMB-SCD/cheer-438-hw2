var express = require('express');
var router = express.Router();


/* GET users listing. */

var topic = 'car';
//do bin/www to launch!!!
/* GET home page. */


function makeTwitterRequest(sendBackTwitter){
    
}

function makeGettyRequest(sendBackGetty ){  //calls sendback at end
    
    module.exports = router;
    var https = require('https');
    
    //https://api.gettyimages.com/v3/search/images?exclude_nudity=true&minimum_size=medium&orientations=horizontal%2Csquare&page_size=50&phrase=car
    //build API call
    const options = {
        hostname:'api.gettyimages.com',
        port: 443,
        path: '/v3/search/images?exclude_nudity=true&minimum_size=medium&orientations=horizontal%2Csquare&phrase=' + topic,
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
            console.log(gettyResponseJSON);
            var choice = Math.floor(Math.random() * images.length); 
            console.log("num images: " + images.length + " ChosenIndex: " + choice);
            console.log("url of first Image: " + images[0].display_sizes[0]);
            var imageURI = images[choice].display_sizes[0].uri;
                   
          //callback return
            sendBackGetty(imageURI);
        });
    }).on("error", function(e){
        console.on("got error: " + e.message); 
    });
    
}

router.get('/', function(req, res, next) {
    
    
    var tweet = "";

    
    //send the API call and parse the response
    makeGettyRequest(function(apiResp){

        res.send(apiResp); //body of callback
        
    });
    
   
    
});

module.exports = router;
