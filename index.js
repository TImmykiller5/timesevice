// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
// app.get("/api/hello", function (req, res) {
//   res.json({greeting: 'hello API'});
// });

app.get("/api/:date", (req, res) => {
  // console.log(Date.parse(req.params["date"]));
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (regex.test(req.params["date"])) {
    const d = new Date(req.params["date"]);
    console.log(d);
    if (!isNaN(d)) {
      res.json({
        unix: d.valueOf(),
        utc: d.toUTCString(),
      });
    } else {
      res.json({ error: "Invalid Date" });
    }
  } else {
    const unix = Number(req.params["date"])
    const d = new Date(unix);

    console.log(d)
    if (!isNaN(d)) {
      res.json({
        unix: d.valueOf(),
        utc: d.toUTCString(),
      });
    } else {
      res.json({ error: "Invalid Date" });
    }
  }
});
app.get("/api", (req, res) => {
  const d = new Date();
  res.json({
    unix: d.valueOf(),
    utc: d.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3005, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
