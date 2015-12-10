var express = require('express');
var request = require('request');
var router = express.Router();

var apiKey = (process.env.API_KEY) ? process.env.API_KEY : 'J5HV-5EUE-5ZZ9-XERY';

/* GET BART API */
// ? means optional
router.get('/:station?', function(req, res, next) {
  // If no param is given, default to NCON (North Concord/Martinez) station
  var station = (req.params.station) ? req.params.station : 'EMBR';

  var apiUrl = 'http://api.bart.gov/api/etd.aspx?cmd=etd&orig='+station+'&key='+apiKey;

  request(apiUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(response.body);
    }
  });
});

module.exports = router;
