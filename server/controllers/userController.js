const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// Verify a user's token.
exports.verifyToken = (req, res, next) => {
	const { accessToken } = req.cookies;
	if (!accessToken) return res.sendStatus(401);

	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);

		req.user = user;
		next();
	});
};

// Verify a user is an admin.
exports.verifyUserIsAdmin = (req, res, next) => {
	// const { accessToken } = req.body;
	const { accessToken } = req.cookies;
	if (accessToken) {
		jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
			if (err) {
				res.sendStatus(500);
			} else {
				if (user.isAdmin) {
					req.user = user;
					next();
				} else {
					res.sendStatus(403);
				}
			}
		});
	}
};

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
		.withMessage('Passwords must match.'),
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
	asyncHandler(async (req, res, next) => {
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
			return res.status(400).json({
				message: errors.array(),
			});
		} else {
			// Data from the form is valid. Save the user.
			storeUser(user);
			res.status(201).json({
				message:
					'Your account has been created. You will be redirected to log in.',
			});
		}
	});

exports.userLogInPost =
	// Verify the user's log in credentials.
	asyncHandler(async (req, res, next) => {
		const { username, password } = req.body;
		const user = await User.findOne({ username: username });
		if (user === null) {
			return res.status(401).send('Username does not exist.');
		}

		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			return res.status(401).send('Incorrect password.');
		}

		// Anything under here is reached if the user is correctly authenticated.
		const accessToken = jwt.sign(
			user.toJSON(),
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '1d' }
		);

		res
			.status(200)
			.cookie('accessToken', accessToken, {
				path: '/',
				httpOnly: true,
				secure: false,
				maxAge: 86400,
				origin: 'http://localhost:5173',
			})
			.json({
				isAdmin: user.isAdmin,
			});
	});

// Clear the stored access token on log out.
exports.clearToken = asyncHandler(async (req, res, next) => {
	res.clearCookie('accessToken').sendStatus(202);
});
