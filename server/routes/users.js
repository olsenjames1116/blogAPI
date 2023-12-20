const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Authenticate the user on the sign up route.
router.get('/sign-up', userController.verifyToken);

// Validate and create a new user on post.
router.post(
	'/sign-up',
	userController.validateUserCreate,
	userController.userCreatePost
);

// Authenticate the user on the log in route.
router.get('/log-in', userController.verifyToken);

// Validate the user's credentials and log them in on post.
router.post('/log-in', userController.userLogInPost);

// Remove token in cookies for the user on log out.
router.get('/log-out', userController.clearToken);

module.exports = router;
