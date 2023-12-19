const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

/* GET users listing. */
router.post(
	'/sign-up',
	userController.validateUserCreate,
	userController.userCreatePost
);

router.post('/log-in', userController.userLogInPost);

module.exports = router;
