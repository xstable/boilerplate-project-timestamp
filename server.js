// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/timestamp/:date_string", (req, res) => {
  let reqDate = req.params.date_string;
  let respDate;
  const pattern = /(\d{4})-(\d{2})-(\d{2})|(\d{13})/;
  const newA = reqDate.match(pattern);
  let reqDateArr;
  reqDateArr = (newA === null) ? Date.now().toString() : newA[0];
  respDate = reqDateArr.toString().length === 13 ? new Date(parseInt(reqDateArr)) : new Date(reqDate);
  res.json({ 
          "unix": respDate.getTime(),
          "utc": respDate.toUTCString()
        });
});

// your first API endpoint...
app.get("/api/hello", function(req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
