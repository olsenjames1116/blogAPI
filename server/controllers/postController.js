const Post = require('../models/post');
const Image = require('../models/image');
const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const cloudinary = require('../utils/cloudinary');

// Get all posts to display on the admin dashboard.
exports.postListGet = asyncHandler(async (req, res, next) => {
	const allPosts = await Post.find({})
		.populate('user')
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
		'title timestamp comments image'
	)
		.populate('user')
		.sort({ timestamp: -1 })
		.exec();

	res.json({
		posts: publishedPosts,
	});
});

// Deletes a post from the db at the request of the user.
exports.postDelete = asyncHandler(async (req, res, next) => {
	// Get details of post.
	const { id } = req.params;

	// Delete object.
	const post = await Post.findOne({ _id: id });
	const _ids = post.comments;
	await Comment.deleteMany({ _id: { $in: _ids } });
	await Post.findByIdAndDelete(id);
	res.sendStatus(202);
});

// Validate and sanitize data from the request.
exports.validatePostUpdate = [
	body('post.image').custom(({ file }) => {
		if (!file.includes('image')) {
			throw new Error('File is not of type image.');
		} else {
			return true;
		}
	}),
	body('post.title', 'Title must not be empty.').trim().escape().notEmpty(),
	body('post.text', 'Text must not be empty.').trim().escape().notEmpty(),
];

// Updates a blog post in the db at the request of the user.
exports.blogUpdatePost = asyncHandler(async (req, res, next) => {
	// Extract the validation errors from a request.
	const errors = validationResult(req);

	// Create a post object with escaped/trimmed data and old id.
	const { post } = req.body;
	const { id } = req.params;
	const updatedPost = new Post({
		image: post.image,
		user: post.user,
		title: post.title,
		text: post.text,
		timestamp: post.timestamp,
		comments: post.comments,
		published: post.published,
		_id: id,
	});

	if (!errors.isEmpty()) {
		// There are errors.
		return res.status(400).json({
			message: errors.array(),
		});
	} else {
		// Data from the form is valid. Save the post.
		const { _id } = await Post.findByIdAndUpdate(
			req.params.id,
			updatedPost,
			{}
		);
		res.status(202).json({
			id: _id,
		});
	}
});

// Gets the details of a post.
exports.postDetailGet = asyncHandler(async (req, res, next) => {
	const post = await Post.findById(req.params.id)
		.populate('user')
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

	const { image, title, text, published } = req.body;

	const post = new Post({
		title: title,
		text: text,
		timestamp: Date.now(),
		published: published,
		user: req.user._id,
	});

	if (!errors.isEmpty()) {
		// There are errors. Render form again with sanitized values/error messages.
		return res.status(400).json({
			message: errors.array(),
		});
	}
	// Store the image in Cloudinary and retrieve the url.
	const { url } = await cloudinary.uploader.upload(image, {
		upload_preset: 'pubChairSports',
	});

	post.image = url;

	// Store post in the db.
	const { _id } = await post.save();
	res.status(201).json({
		id: _id,
	});
});
