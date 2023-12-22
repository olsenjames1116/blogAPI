const { validationResult } = require('express-validator');
const Comment = require('../models/comment');

exports.commentCreatePost = async (req, res, next) => {
	try {
		// Extract the validation errors from the request.
		const errors = validationResult(req);

		const { text } = req.body;
		const comment = new Comment({
			text: text,
			user: req.user._id,
			timestamp: Date.now(),
		});

		if (!errors.isEmpty()) {
			// There are errors.
			return res.status(400).json({
				errors: errrors.array(),
			});
		}

		await comment.save();
	} catch (err) {
		console.log(err);
	}
};
