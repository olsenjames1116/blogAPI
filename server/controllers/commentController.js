const { validationResult } = require('express-validator');
const Comment = require('../models/comment');
const Post = require('../models/post');

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

		const newComment = await comment.save();
		const post = await Post.findById(req.params.id);
		post.comments.push(newComment);
		await post.save();
	} catch (err) {
		console.log(err);
	}
};
