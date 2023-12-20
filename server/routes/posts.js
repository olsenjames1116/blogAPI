const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const userController = require('../controllers/userController');

router.get('/posts', userController.verifyUserIsAdmin);

module.exports = router;
