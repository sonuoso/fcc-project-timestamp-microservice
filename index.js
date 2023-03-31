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
app.get("/api/:date?", function(req, res) {
  let newDate;
  let nowDate;
  //Checking if date parameter is true and a valid timestamp before assigning to response json object
  if (req.params.date) {
    newDate = new Date(req.params.date)
    if (isNaN(Date.parse(newDate))) {
      newDate = new Date(+(req.params.date))
      if (isNaN(Date.parse(newDate))) {
        res.json({ error: "Invalid Date" })
      }
      else {
        res.json({ unix: newDate.getTime(), utc: newDate.toUTCString() });
      }
    }
    else {
      res.json({ unix: newDate.getTime(), utc: newDate.toUTCString() });
    }
  }
  else {
    //Using current timestamp if the date paaremter is empty
    nowDate = new Date();
    res.json({ unix: nowDate.getTime(), utc: nowDate.toUTCString() })
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
