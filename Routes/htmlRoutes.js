var express = require("express")
var app = express();
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

// ROUTES
// ++++++++++++++++++++++++++++++++++++++++++++++

module.exports = function (app) {

    app.get("/", function (req, res) {
        db.Article.find({})
            .then(dbUser => {
                res.render("index", { data: dbUser });
            })
            .catch(err => {
                res.status(500).json(err);
            });
    });


    app.get("/scrape", function (req, res) {
        axios.get("https://www.npr.org").then(function (response) {
            var $ = cheerio.load(response.data);

            // Grab a selected item from the website to scrape.
            $(".title").each(function (i, element) {
                var result = {};
                // Get text from every link and save them as properties of the result object
                result.title = $(this).text();
                result.link = $(this).parent("a").attr('href');
                // console.log(result.link)
                db.Article.update(result, result, { upsert: true })
                    .then(function (dbArticle) {
                        // console.log(dbArticle);
                    }).catch(function (err) {
                        console.log(err)
                    })
            });
            res.send("Scrape Complete");
        });
    });
}

