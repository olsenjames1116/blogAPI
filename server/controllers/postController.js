const Post = require('../models/post');
const Image = require('../models/image');
const { body, validationResult } = require('express-validator');

// Get all posts to display on the admin dashboard.
exports.postListGet = async (req, res, next) => {
	try {
		const allPosts = await Post.find({})
			.populate('user')
			.populate('image')
			.sort({ timestamp: -1 })
			.exec();

		res.json({
			posts: allPosts,
			isAdmin: req.user.isAdmin,
		});
	} catch (err) {
		res.status(500).send(err.message);
	}
};

// Get all published posts to display on the home page.
exports.publishedPostsGet = async (req, res, next) => {
	try {
		const publishedPosts = await Post.find(
			{ published: true },
			'title timestamp'
		)
			.populate('user')
			.populate('image')
			.sort({ timestamp: -1 })
			.exec();

		isAdmin = req.user ? req.user.isAdmin : false;

		res.json({
			posts: publishedPosts,
			isAdmin: isAdmin,
		});
	} catch (err) {
		res.status(500).send(err.message);
	}
};

exports.postDelete = async (req, res, next) => {
	try {
		// Get details of post.
		const { _id } = req.body.post;
		const post = await Post.findById(_id);

		// Delete object.
		await Post.findByIdAndDelete(_id);
		res.status(202).json({ errors: 'The post has been deleted.' });
	} catch (err) {
		console.log(err);
	}
};

exports.blogUpdatePost = async (req, res, next) => {
	try {
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
			res.status(202).json({
				errors: 'The post has been updated.',
			});
		}
	} catch (err) {
		res.status(500).send('Could not update post.');
	}
};

exports.postDetailGet = async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.id)
			.populate('user')
			.populate('image')
			.exec();

		res.json({
			post: post,
		});
	} catch (err) {
		console.log(err);
	}
};

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
exports.blogCreatePost = async (req, res, next) => {
	try {
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
				errors: errors.array(),
			});
		}
		// Data from the form is valid. Save the image and post.
		const savedImage = await newImage.save();
		post.image = savedImage._id;
		await post.save();
	} catch (err) {
		console.log(err);
	}
};
