var express = require('express');
var router = express.Router();
var numb = Math.floor((Math.random() * 100) + 1); 
/* GET users listing. */
router.get('/', function(req, res, next) {
    numb = Math.floor((Math.random() * 100) + 1); 
  res.render('random', { rando: numb });
});

module.exports = router;
