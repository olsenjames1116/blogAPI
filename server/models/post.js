const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
	image: { type: Schema.Types.ObjectId, ref: 'Image', required: true },
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	title: { type: String, required: true },
	text: { type: String, required: true },
	timestamp: { type: Date, required: true },
	comments: { type: Schema.Types.ObjectId, ref: 'Comment' },
	published: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model('Post', PostSchema);
