const User = require('../models/user');
const { body, validationResult } = require('express-validator');

// Validate and sanitize fields to create user.
exports.validateUserCreate = [
	body('username')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Username must not be empty.')
		.custom(async (username) => {
			const user = await User.findOne({ username: username });
			if (user) {
				throw new Error('Username is already in use.');
			}
		}),
	body('password', 'Password must not be empty.').trim().escape().notEmpty(),
	body('confirmPassword')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Confirmation password must not be empty.')
		.custom(
			(confirmPassword,
			(req) => {
				return confirmPassword === req.body.password;
			})
		)
		.withMessage('Password must match.'),
];

exports.userCreatePost =
	// Process request after validation and sanitization.
	async (req, res, next) => {
		try {
			// Extract the validation errors from the request.
			const errors = validationResult(req);

			// Create a User object with escaped and trimmed data.
			const user = new User({
				username: req.body.username,
				password: req.body.password,
				confirmPassword: req.body.confirmPassword,
			});

			if (!errors.isEmpty()) {
				// There are errors. Render form again with sanitized values/error messages.
				res.json({
					user: user,
					errors: errors,
				});

				return;
			} else {
				res.send('User has been saved.');
			}
		} catch (err) {
			return next(err);
		}
	};
