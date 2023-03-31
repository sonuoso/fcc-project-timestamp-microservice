// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/:dateTime", function(req, res) {
  let utcDate;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  //Parsing timestamp from string to number and converting ts or route parameter to a Date object
  if ((req.params.dateTime).length > 10) {
    let ts = +(req.params.dateTime);
    utcDate = new Date(ts)
  } else {
    utcDate = new Date(req.params.dateTime)
  }

  //Adding 0 before a digit
  function addZero(x) {
    if (x < 10) {
      x = "0" + x;
      return x;
    }
  }
  
  res.json({ "unix": utcDate.getTime(), "utc": days[(utcDate.getDay() - 1)] + "," + " " + utcDate.getDate() + " " + months[utcDate.getMonth()] + " " + utcDate.getFullYear() + " " + addZero(utcDate.getHours()) + ":" + addZero(utcDate.getMinutes()) + ":" + addZero(utcDate.getSeconds()) + " GMT" });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
