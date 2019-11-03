// Requiring the dependencies
let express = require('express');
var logger = require("morgan");
var mongoose = require("mongoose");

// Setting up the Express App
let app = express();
let PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require('./models');

// Use morgan logger for logging requests
app.use(logger("dev"));

// parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newsscrapedb", { useNewUrlParser: true, useUnifiedTopology: true });

// set handlebars
let exphbs = require("express-handlebars");
const HandleBars = require("handlebars")

app.engine("handlebars", exphbs({ defaultLayout: "main-layout" }));
app.set("view engine", "handlebars");


// Import routes and give the server access to them.
require("./routes/html-routes.js")(app);
require('./routes/article-comments-routes')(app);


// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });