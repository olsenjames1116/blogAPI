const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const userController = require('../controllers/userController');

router.get(
	'/posts',
	userController.verifyUserIsAdmin,
	postController.publishedPostsGet
);

router.get(
	'/all-posts',
	userController.verifyUserIsAdmin,
	postController.postListGet
);

router.post(
	'/post/create',
	userController.verifyToken,
	postController.validatePostCreate,
	postController.blogCreatePost
);

router.get('/post/:id', postController.postDetailGet);

router.put(
	'/post/:id',
	userController.verifyToken,
	postController.blogUpdatePost
);

router.delete(
	'/post/:id',
	userController.verifyToken,
	postController.postDelete
);

module.exports = router;
