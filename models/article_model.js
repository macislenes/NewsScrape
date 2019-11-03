let timestamp = require('mongoose-timestamp');
let mongoose = require("mongoose");

let Schema = mongoose.Schema;

var ArticleSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: true,
    },    
    description: {
		type: String,
		trim: true,
		required: true,
	},
    link: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: true,
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]

  });
  


ArticleSchema.plugin(timestamp)

// Export the Article model
module.exports = exports = mongoose.model("Article", ArticleSchema);