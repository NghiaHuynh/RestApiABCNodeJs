const express = require('express');
const router = express.Router();

router.post("/events",(req, res) => {

  console.log("test post");

  // var infoBody = "abc";

  // const options = {
  //   url: 'https://api.abcfinancial.com/rest/9003/calendars/events?page=1&eventDateRange=2023-12-28',
  //   headers: {
  //     'User-Agent': 'request',
  //     'app_id'        : 'a6c6c04b',
  //     'app_key'        : '2e99851faed9e250571112f99599d67f',
  //     'Accept'        : 'application/json;charset=UTF-8',
  //     'Content-Type' : 'application/json; charset=utf-8'
  //   }
  // };

  // function parse(){
  //     return new Promise(function(resolve, reject){
  //         request(options, function (error, response, body) {
  //             // in addition to parsing the value, deal with possible errors
  //             if (error) return reject(error);
  //             try {
  //                 // JSON.parse() can throw an exception if not valid JSON
  //                 var info = JSON.parse(body);
  //                 resolve(info);
  //             } catch(e) {
  //                 reject(e);
  //             }
  //         });
  //     });
  // }

  // parse().then(function(val) {
  //   infoBody = val;
    
  // }).catch(function(err) {
  //     console.err(err);
  // });


});


module.exports = router;