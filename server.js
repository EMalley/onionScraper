var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// scraping tools
var PORT = 8080;
var app = express();



// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/nprScraper", { useNewUrlParser: true });

// handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Routes 
// ++++++++++++++++++++++++++++++++++++++++++++++

require("./Routes/apiRoutes.js")(app);
require("./Routes/htmlRoutes.js")(app);

// ++++++++++++++++++++++++++++++++++++++++++++++

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT);
});

