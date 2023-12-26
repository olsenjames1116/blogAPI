import React from 'react';
import PropTypes from 'prop-types';
import api from '../../axiosConfig';
import AdminControls from '../AdminControls/AdminControls';
import PostInfo from '../PostInfo/PostInfo';
import { useSelector } from 'react-redux';
import styles from './Posts.module.css';

// Represents the list of posts on the admin dashboard or home page.
function Posts({ posts, fetchData, adminPage }) {
	const isAdmin = useSelector((state) => state.isAdmin.value);

	// Deletes a post in the db from the admin dashboard.
	const deletePost = async (post) => {
		try {
			await api.delete(`/post/${post._id}`, {
				post: post,
			});
			fetchData();
		} catch (err) {
			console.log(err);
		}
	};

	// Publishes a post to be viewed by all users from the admin dashboard.
	const publishPost = async (post) => {
		try {
			await api.put(`/post/${post._id}`, {
				post: { ...post, published: true },
			});
			fetchData();
		} catch (err) {
			console.log(err);
		}
	};

	// Unpublishes a post to be removed from view by all users from the admin dashboard.
	const unpublishPost = async (post) => {
		try {
			await api.put(`/post/${post._id}`, {
				post: { ...post, published: false },
			});
			fetchData();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<ul className={styles.posts}>
			{posts.map((post, index) => {
				return (
					<li className={styles.post} key={post._id}>
						<PostInfo post={post} />
						{isAdmin && adminPage && (
							<AdminControls
								post={post}
								deletePost={deletePost}
								publishPost={publishPost}
								unpublishPost={unpublishPost}
							/>
						)}
						{index !== posts.length - 1 && <hr />}
					</li>
				);
			})}
		</ul>
	);
}

Posts.defaultProps = {
	adminPage: false,
};

Posts.propTypes = {
	posts: PropTypes.array,
	admin: PropTypes.bool,
	fetchData: PropTypes.func,
	adminPage: PropTypes.bool,
};

export default Posts;
