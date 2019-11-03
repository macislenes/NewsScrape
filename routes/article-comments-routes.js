// Dependencies
let path = require('path');
var db = require("../models");

module.exports = function (app) {

    app.get('/article-comments', async function (req, res) {

        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        await db.Article.findOne({ _id: req.query.id })
        .then(async function (article) {
            let articleContents = {

                article: article

            }
            if (article.comments.length > 0) {
                
                await db.Comment.find({ _id: { $in: article.comments } })
                    .then(function (comments) {
                        articleContents.comments = comments;
                        res.render('article-comments', articleContents);
                    });
            }
            else{
                res.render('article-comments', articleContents);
            }
        });
    });

    app.post('/article-comments/:id', async function (req, res) {

        let commentContents = {

            email: req.body.username,
            comment: req.body.user_comments

        };

        await db.Comment.create(commentContents)
            .then(async function (dbComment) {

                console.log(dbComment);

                await db.Article.findOne({ _id: req.params.id })
                    .then(function (article) {
                        article.comments.push(dbComment._id);
                        article.save();

                        let commentContents = {

                            comments: comment

                        }
                    });
                res.json({ success: true });

            })
            .catch(function (err) {
                res.json({ success: false });

            });


    });
    

    app.delete('/article-comments/:id', async function(req, res){
        await db.Comment.findOne({ _id: req.params.id })
                    .remove();
        res.json({success: true});
    });


};

