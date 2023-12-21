const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
	file: { type: String, required: true },
});

module.exports = mongoose.model('Image', ImageSchema);