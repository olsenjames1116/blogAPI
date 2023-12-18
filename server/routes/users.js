const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

/* GET users listing. */
router.get(
	'/sign-up',
	userController.validateUserCreate,
	userController.userCreatePost
);

module.exports = router;
