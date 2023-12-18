const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
	text: { type: String, required: true },
	timestamp: { type: Date, required: true },
	comments: { type: Schema.Types.ObjectId, ref: 'Comment', required: true },
	published: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model('Post', PostSchema);
