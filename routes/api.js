var express = require('express');
var request = require('request');

var router = express.Router();

var apiKey = 'J5HV-5EUE-5ZZ9-XERY';
var station = 'NCON';

var apiUrl = 'http://api.bart.gov/api/etd.aspx?cmd=etd&orig='+station+'&key='+apiKey;

/* GET BART API. */
router.get('/', function(req, res, next) {
  request(apiUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(response.body);
    }
  });
});

module.exports = router;
