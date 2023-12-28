const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Validate and create a new user on post.
router.post(
	'/sign-up',
	userController.validateUserCreate,
	userController.userCreatePost
);

// Validate the user's credentials and log them in on post.
router.post('/log-in', userController.userLogInPost);

// Remove token in storage for the user on log out.
router.get('/log-out', userController.clearToken);

module.exports = router;
