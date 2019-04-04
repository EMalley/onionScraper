var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");
var app = express();

module.exports = function (app) {
    app.get("/articles", function (req, res) {
        db.Article.find({})
            .then(function (dbArticle) {
                res.render("index", { data: dbArticle })
            }).catch(function (err) {
                res.json(err);
            })
    });


    //Route to get an Article by its id and populate it with its note. 
    app.get("/articles/:id", function (req, res) {
        var id = req.params.id;
        db.Article.findById(id)
            .then(function (dbArticle) {
                res.json(dbArticle)
            }).catch(function (err) {
                res.json(err)
            });
    });


    //Route to Save a specific note from an article
    app.get("/articles/:id", function (req, res) {
        db.Note.create(req.body)
            .then(function (dbNote) {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote })
                    .then(function (dbArticle) {
                        res.json(dbArticle)
                    }).catch(function (err) {
                        res.json(err)
                    });
            });
    });
}

