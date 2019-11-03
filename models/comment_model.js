var mongoose = require("mongoose");
let timestamp = require('mongoose-timestamp');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var CommentSchema = new Schema({
    email: {
		type: String,
		trim: true,
		required: true,
    }, 
    comment: {
		type: String,
		trim: true,
		required: true,
	},
});


CommentSchema.plugin(timestamp);

// Export the Note model
module.exports = exports = mongoose.model("Comment", CommentSchema);
