const { validationResult, body } = require('express-validator');
const Comment = require('../models/comment');
const Post = require('../models/post');
const asyncHandler = require('express-async-handler');

// Validate and sanitize data from the request.
exports.validateCommentCreate = [
	body('text', 'Text must not be empty.').trim().escape().notEmpty(),
];

exports.commentCreatePost = asyncHandler(async (req, res, next) => {
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
			message: errors.array(),
		});
	}

	const newComment = await comment.save();
	const post = await Post.findById(req.params.id);
	post.comments.push(newComment);
	const updatedPost = await Post.findOneAndUpdate(
		{ _id: req.params.id },
		{ comments: post.comments },
		{ new: true }
	)
		.populate({ path: 'comments', populate: { path: 'user' } })
		.exec();
	res.json({
		comments: updatedPost.comments,
	});
});
