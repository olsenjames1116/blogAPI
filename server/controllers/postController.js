const Post = require('../models/post');
const Image = require('../models/image');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

// Get all posts to display on the admin dashboard.
exports.postListGet = asyncHandler(async (req, res, next) => {
	const allPosts = await Post.find({})
		.populate('user')
		.populate('image')
		.sort({ timestamp: -1 })
		.exec();

	res.json({
		posts: allPosts,
	});
});

// Get all published posts to display on the home page.
exports.publishedPostsGet = asyncHandler(async (req, res, next) => {
	const publishedPosts = await Post.find(
		{ published: true },
		'title timestamp comments'
	)
		.populate('user')
		.populate('image')
		.sort({ timestamp: -1 })
		.exec();

	res.json({
		posts: publishedPosts,
	});
});

exports.postDelete = asyncHandler(async (req, res, next) => {
	// Get details of post.
	const { _id } = req.body.post;
	const post = await Post.findById(_id);

	// Delete object.
	await Post.findByIdAndDelete(_id);
	res.sendStatus(202);
});

exports.blogUpdatePost = asyncHandler(async (req, res, next) => {
	// Extract the validation errors from a request.
	const errors = validationResult(req);

	// Create a post object with escaped/trimmed data and old id.
	const { post } = req.body;
	const updatedPost = new Post({
		image: post.item,
		user: post.user,
		title: post.title,
		text: post.text,
		timestamp: post.timestamp,
		comments: post.comments,
		published: post.published,
		_id: req.params.id,
	});

	if (!errors.isEmpty()) {
		// There are errors.
		return res.status(400).json({
			errors: errors.array(),
		});
	} else {
		// Data from the form is valid. Save the post.
		await Post.findByIdAndUpdate(req.params.id, updatedPost, {});
		res.sendStatus(202);
	}
});

exports.postDetailGet = asyncHandler(async (req, res, next) => {
	const post = await Post.findById(req.params.id)
		.populate('user')
		.populate('image')
		.populate({
			path: 'comments',
			populate: {
				path: 'user',
			},
		})
		.exec();

	res.json({
		post: post,
	});
});

// Validate and sanitize data from the request.
exports.validatePostCreate = [
	body('image').custom((image) => {
		if (!image.includes('image')) {
			throw new Error('File is not of type image.');
		} else {
			return true;
		}
	}),
	body('title', 'Title must not be empty.').trim().escape().notEmpty(),
	body('text', 'Text must not be empty.').trim().escape().notEmpty(),
];

// Process request after validation and sanitization.
exports.blogCreatePost = asyncHandler(async (req, res, next) => {
	// Extract the validation errors from the request.
	const errors = validationResult(req);

	const { image, title, text } = req.body;
	const newImage = new Image({
		file: image,
	});
	const post = new Post({
		title: title,
		text: text,
		timestamp: Date.now(),
		user: req.user._id,
	});

	if (!errors.isEmpty()) {
		// There are errors. Render form again with sanitized values/error messages.
		return res.status(400).json({
			message: errors.array(),
		});
	}
	// Data from the form is valid. Save the image and post.
	const savedImage = await newImage.save();
	post.image = savedImage._id;
	await post.save();
	res.sendStatus(201);
});
