var express = require('express');
var request = require('request');
var moment = require('moment');
// const eventsPost = require('./express-post');
var app = express();

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// serve files from the public directory
app.use(express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  
  var infoBody = "abc";
  const clubNumber = "30183";
  const eventDateRange = moment().format('YYYY-MM-DD');
  console.log(eventDateRange);

  const options = {
    url: 'https://api.abcfinancial.com/rest/'+clubNumber+'/calendars/events?page=1&eventDateRange='+eventDateRange,
    headers: {
      'User-Agent': 'request',
      'app_id'        : 'a6c6c04b',
      'app_key'        : '2e99851faed9e250571112f99599d67f',
      'Accept'        : 'application/json;charset=UTF-8',
      'Content-Type' : 'application/json; charset=utf-8'
    }
  };

  function parse(){
      return new Promise(function(resolve, reject){
          request(options, function (error, response, body) {
              // in addition to parsing the value, deal with possible errors
              if (error) return reject(error);
              try {
                  // JSON.parse() can throw an exception if not valid JSON
                  var info = JSON.parse(body);
                  // console.log(parseJsonEvents(info.events));
                  var eventsJson = parseJsonEvents(info.events);
                  resolve(eventsJson);
              } catch(e) {
                  reject(e);
              }
          });
      });
  }

  parse().then(function(val) {
    infoBody = val;
    //console.log(infoBody);
    res.render('pages/events', {
      infoBody: infoBody,
      moment: moment
    });
    
  }).catch(function(err) {
      console.err(err);
  });


});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

app.post('/events', function(req, res) {
  console.log("get events data post");

  var clubNumber = req.body.clubNumber;
  var eventDateRange = req.body.eventDateRange;

  //console.log(req.body);
  var urlString = 'https://api.abcfinancial.com/rest/'+clubNumber+'/calendars/events?page=1&eventDateRange='+eventDateRange;
  console.log(urlString);
  const options = {
    url: urlString,
    headers: {
      'User-Agent': 'request',
      'app_id'        : 'a6c6c04b',
      'app_key'        : '2e99851faed9e250571112f99599d67f',
      'Accept'        : 'application/json;charset=UTF-8',
      'Content-Type' : 'application/json; charset=utf-8'
    }
  };

  request(options, function (error, response, body) {
      // in addition to parsing the value, deal with possible errors
      if (error) return console.log(error);
      try {
          // JSON.parse() can throw an exception if not valid JSON
          var info = JSON.parse(body);
          // console.log(info);
          var eventsJson = parseJsonEvents(info.events);
          res.json(eventsJson);
          
      } catch(e) {
          console.log(e);
      }
    });
  
});

app.post('/eventDescription', function(req, res) {
  console.log("get event description data post");

  var clubNumber = req.body.clubNumber;
  var eventTypeId = req.body.eventTypeId;

  //console.log(req.body);
  var urlString = 'https://api.abcfinancial.com/rest/'+clubNumber+'/calendars/eventtypes/'+eventTypeId;
  console.log(urlString);
  const options = {
    url: urlString,
    headers: {
      'User-Agent': 'request',
      'app_id'        : 'a6c6c04b',
      'app_key'        : '2e99851faed9e250571112f99599d67f',
      'Accept'        : 'application/json;charset=UTF-8',
      'Content-Type' : 'application/json; charset=utf-8'
    }
  };

  request(options, function (error, response, body) {
      // in addition to parsing the value, deal with possible errors
      if (error) return console.log(error);
      try {
          // JSON.parse() can throw an exception if not valid JSON
          var info = JSON.parse(body);
          // console.log(info);
          var eventsJson = parseJsonEventTypes(info.eventTypes);
          res.json(eventsJson);
          
      } catch(e) {
          console.log(e);
      }
    });

});

app.post('/availableEmployees', function(req, res) {
  console.log("get available employees data post");
  var clubNumber = req.body.clubNumber;
  var eventId = req.body.eventId;

  //console.log(req.body);
  var urlString = 'https://api.abcfinancial.com/rest/'+clubNumber+'/calendars/events/'+eventId+'/availableemployees';
  console.log(urlString);
  const options = {
    url: urlString,
    headers: {
      'User-Agent': 'request',
      'app_id'        : 'a6c6c04b',
      'app_key'        : '2e99851faed9e250571112f99599d67f',
      'Accept'        : 'application/json;charset=UTF-8',
      'Content-Type' : 'application/json; charset=utf-8'
    }
  };

  request(options, function (error, response, body) {
      // in addition to parsing the value, deal with possible errors
      if (error) return console.log(error);
      try {
          // JSON.parse() can throw an exception if not valid JSON
          var info = JSON.parse(body);
          // console.log(info);
          var eventsJson = parseJsonAvailableEmployees(info);
          res.json(eventsJson);
          
      } catch(e) {
          console.log(e);
      }
    });
  
});

function parseJsonEventTypes(eventTypes){
  var eventsJson = {} // empty Object
  var key = 'eventTypes';
  eventsJson[key] = []; // empty Array, which you can push() values into

  var data = {
          description: eventTypes[0].description
      };
  eventsJson[key].push(data);
  return eventsJson;
}

function parseJsonAvailableEmployees(body){
  var eventsJson = {} // empty Object
  var key = 'availableEmployees';
  eventsJson[key] = []; // empty Array, which you can push() values into
  var description = "";
  if(body.status.count == "0"){
    description = "Bio currently unavailable.";
  }
  var data = {
          description: description
      };
  eventsJson[key].push(data);
  return eventsJson;
}

function parseJsonEvents(events){
  var eventsJson = {} // empty Object
  var key = 'events';
  eventsJson[key] = []; // empty Array, which you can push() values into

  events.forEach(function(event){
    if(event.category == 'Class'){
      var enrolled = "";
      if((typeof event.members == 'undefined')){
        enrolled = "0" + " of "+ event.maxAttendees;;
      }
      if (typeof event.members != 'undefined') {
        enrolled = event.members.length + " of "+ event.maxAttendees;
      }
      var data = {
          sampleTime: moment(event.startBookingTime).format('LT') +' - '+moment(event.startBookingTime).add(event.duration, 'minutes').format('LT'),
          description: event.eventName +' with ' + event.employeeName,
          enrolled: enrolled,
          room: event.locationName,
          eventId:event.eventId,
          eventTypeId:event.eventTypeId
      };
      eventsJson[key].push(data);
    }
  });
  return eventsJson;
}



// // register
// app.use('/events', eventsPost);
 

app.listen(8080);
console.log('Server is listening on port 8080');