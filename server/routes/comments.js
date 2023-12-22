const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController');

router.post(
	'/create',
	userController.verifyToken,
	commentController.commentCreatePost
);

module.exports = router;
