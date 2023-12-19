const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

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
		.custom((confirmPassword, { req }) => {
			return confirmPassword === req.body.password;
		})
		.withMessage('Password must match.'),
];

// Hash the password before storing in the database.
const storeUser = (user) => {
	bcrypt.hash(user.password, 10, async (err, hashedPassword) => {
		if (err) {
			return next(err);
		} else {
			user.password = hashedPassword;
			await user.save();
		}
	});
};

exports.userCreatePost =
	// Process request after validation and sanitization.
	async (req, res, next) => {
		try {
			// Extract the validation errors from the request.
			const errors = validationResult(req);

			// Create a User object with escaped and trimmed data.
			const { username, password, confirmPassword } = req.body;
			const user = new User({
				username: username,
				password: password,
				confirmPassword: confirmPassword,
			});

			if (!errors.isEmpty()) {
				// There are errors. Render form again with sanitized values/error messages.
				res.status(400).json({
					errors: errors.array(),
				});

				return;
			} else {
				// Data from the form is valid. Save the user.
				storeUser(user);
				res.status(201).json({
					errors:
						'Your account has been created. You will be redirected to log in.',
				});
			}
		} catch {
			return res.status(500).send('Could not post a new user.');
		}
	};

exports.userLogInPost =
	// Verify the user's log in credentials.
	async (req, res, next) => {
		try {
			const { username, password } = req.body;
			const user = await User.findOne({ username: username });
			if (user === null) {
				return res.status(401).send('Username does not exist.');
			}
			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				return res.status(401).send('Incorrect password.');
			}
			res.status(200).send('Successful log in.');
		} catch {
			res.status(500).send('Could not log user in.');
		}
	};
