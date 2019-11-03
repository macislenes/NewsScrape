# NewsScrape

## What is NewsScrape?

A Node application using a Mongo DB to scrape and store articles from the BuzzFeed url. Allowing for users to comment on articles to be viewed by others later

## How was it implemented?

NewsScrape has three parts to it. Client side HTML using Handlebars & JavaScript. As well as server side JavaScript based on node & server side queries utilizing get, post, put and delete routes alonside mongoose to store and retreive information from the database. Using handlebars to dynamically render the information to our html. 

## Dependencies

NewsScrape uses the following node packages as dependencies:

* [express](https://www.npmjs.com/package/express) - Used to start our server and listen for client requests
* * [express-handlebars](https://www.npmjs.com/package/express-handlebars) - Used to keep dynamically render content from Mongo DB
* [Mongoose](https://www.npmjs.com/package/mongoose) - Used to comunicate with the Mongo DB
* [mongoose-timestamp](npmjs.com/package/mongoose-timestamp) - Used to timestamp the comments
* [cheerio](https://www.npmjs.com/package/cheerio) - Used to scrape the BuzzFeed URL
* [path](https://www.npmjs.com/package/path) - Used as a path module
* [axios](https://www.npmjs.com/package/axios) - Used as a promise based HTTP client for the browser
* [morgan](https://www.npmjs.com/package/morgan) - Used as a HTTP request logger middleware for node.js
 

## Unpacking the App

The application is divided into six main parts

* server.js: sets up the node server   
    * Connects our Express engine to run our 'Main-Layout' as the set layout for the DOM
    * Uses .connect() to connect to our Mongo DB

* routes: responsible for defining routes that the server can listen to there are three main js files for the routes
    * html-routes: handles both html GET routes to display scrape the BuzzFeed URL as well as one to render the 'view-articles' handlebars and renter the article contents
    * article-comments-routes: handles 1 GET routes to render the information from the database, 1 POST routes to add comments to the database for each article and 1 DELETE route to delete any comment


* models: representation of the data we plan on sending to the database. Connects the database and server using mongoose

* public: contains the assets we will use on the client side; CSS

* views: contains the main.handlebars page we will use as a layout and the view-articles.handlebars to render the articles to the html dynamically

 
## Start to Finish:
Here's how you can use NewsScrape!

1. Upon loading the page the scrape will be done and the first set of articles will be rendered to the page and saved to the database
2. Once you click to comment on an article it will route you to a comment page
3. When you are on the comment page you can view other comments left by other users or leave one of your own. 
4. You also have the ability to delete comments 
5. You can go back to the main page and do the same for any of the other articles

Designed and developed by: Maci Slenes
