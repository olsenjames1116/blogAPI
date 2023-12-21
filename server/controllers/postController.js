const Post = require('../models/post');
const Image = require('../models/image');
const { body, validationResult } = require('express-validator');

// Get all published posts to display on the home page.
exports.publishedPostsGet = async (req, res, next) => {
	try {
		const publishedPosts = await Post.find(
			{ published: true },
			'title timestamp'
		)
			.populate('user', 'image')
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
			console.log(errors);
			res.status(400).json({
				errors: errors.array(),
			});

			return;
		} else {
			// Data from the form is valid. Save the image and post.
			const savedImage = await newImage.save();
			post.image = savedImage._id;
			await post.save();
		}
	} catch (err) {
		console.log(err);
	}
};
