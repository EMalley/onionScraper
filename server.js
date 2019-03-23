var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");
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
mongoose.connect("mongodb://localhost/onionScraper", { useNewUrlParser: true });

var result = [];
// ROUTES
// ++++++++++++++++++++++++++++++++++++++++++++++
// A GET route for scraping theOnion website
axios.get("https://www.theonion.com/").then(function(response){
    var $ = cheerio.load(response.data);
    // console.log(JSON.stringify(response.data, null , 2));
    // Grab a selected item from the website to scrape.
    $(".js_entry-link").each(function(i, element){
        // var result = {};
        // Get text from every link and save them as properties of the result object
        result.push({
            title: $(this).children("a").val()
            // link: $(this).children("a").attr("href")
        })

        // result.title = $(this).text();
        // result.link =$(this).children("a").attr('href');
        console.log(result)
        db.Article.create(result).then(function(dbArticle){
            // console.log(dbArticle);
        }).catch(function(err){
            // console.log(err)
        })
    });
    // res.send("Scrape Complete");
});

// Route for getting articles from DB
app.get("/articles", function(req, res){
    var id = req.params.id
    db.Article.findById(id)
    .then(function(dbArticle){
        res.json(dbArticle)
    }).catch(function(err){
        res.json(err);
    })
});


//Route to get an Article by its id and populate it with its note. 
app.get("/articles/:id", function(req, res){
    var id = req.params.id;
    db.Article.findById(id)
    .then(function(dbArticle){
        res.json(dbArticle)
    }).catch(function(err){
        res.json(err)
    });
});


//Route to Save a specific note from an article
app.get("/articles/:id", function(req, res){
    db.Note.create(req.body)
    .then(function(dbNote){
        return db.Article.findOneAndUpdate({_id: req.params.id}, {note: dbNote}).then(function (dbArticle){
            res.json(dbArticle)
        }).catch(function(err){
            res.json(err)
        });
    });
});

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT);
  });
  
