const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController');

// Create a new comment. Only logged in users can do this.
router.post(
	'/create/:id',
	userController.verifyToken,
	commentController.validateCommentCreate,
	commentController.commentCreatePost
);

module.exports = router;
