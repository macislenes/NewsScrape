let express = require("express");
let logger = require("morgan");
let mongoose = require("mongoose");
let timestamp = require('mongoose-timestamp');


// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
let axios = require("axios");
let cheerio = require("cheerio");

// Require all models
var db = require("../models");

module.exports = function (app) {
    async function scrape() {

        await axios.get("https://www.buzzfeednews.com").then(async function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);
            var result_arr = [];


            // Now, we grab every h2 within an article tag, and do the following:
            $("a.newsblock-story-card__link").each(function (i, element) {

                // Add the text and href of every link, and save them as properties of the result object
                result_arr.push({
                    title: $(this).text().trim(),
                    link: $(this).attr("href")
                });

            });

            $('p.newsblock-story-card__description').each(function (i, element) {

                result_arr[i].description = $(this).text().trim();

            })

            await db.Article.insertMany(result_arr)
            .then(function (dbArticle) {
                return true;
            })
            .catch(function (err) {
                console.log(err.message);
                return false;
            });

        });

    }

    //on the '/login' route we will use the 'GET' method to display the 'login' page
    app.get('/', async function (req, res) {

        let scraped = await scrape();
        console.log(scraped);
        db.Article.find({})
        .then(function(articles) {

            let articleContents = {

                articles: articles

            }
            
            res.render('view-articles', articleContents);
        })
        .catch(function(err) {
          // If an error occurs, send the error back to the client
          res.json(err);
        });

    });

};