const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const userController = require('../controllers/userController');

// Get a list of the published posts from the home page.
router.get('/posts', postController.publishedPostsGet);

// Get a list of all posts from the admin dashboard.
router.get(
	'/all-posts',
	userController.verifyUserIsAdmin,
	postController.postListGet
);

// Post a new blog post. Only admins can do this.
router.post(
	'/create',
	userController.verifyUserIsAdmin,
	postController.validatePostCreate,
	postController.blogCreatePost
);

// Get the details of a specific blog post.
router.get('/:id', postController.postDetailGet);

// Update the details of a blog post. Only admins can do this.
router.put(
	'/:id',
	userController.verifyUserIsAdmin,
	postController.validatePostUpdate,
	postController.blogUpdatePost
);

// Delete a blog post. Only admins can do this.
router.delete(
	'/:id',
	userController.verifyUserIsAdmin,
	postController.postDelete
);

module.exports = router;
