import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AdminControls from '../AdminControls/AdminControls';
import PostInfo from '../PostInfo/PostInfo';
import { useSelector } from 'react-redux';

function Posts({ posts, fetchData, adminPage }) {
	const isAdmin = useSelector((state) => state.isAdmin.value);

	const deletePost = async (post) => {
		try {
			await axios.delete(`http://localhost:4000/api/post/${post._id}`, {
				post: post,
			});
			fetchData();
		} catch (err) {
			console.log(err);
		}
	};

	const publishPost = async (post) => {
		try {
			await axios.put(`http://localhost:4000/api/post/${post._id}`, {
				post: { ...post, published: true },
			});
			fetchData();
		} catch (err) {
			console.log(err);
		}
	};

	const unpublishPost = async (post) => {
		try {
			await axios.put(`http://localhost:4000/api/post/${post._id}`, {
				post: { ...post, published: false },
			});
			fetchData();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<ul className="posts">
			{posts.map((post) => {
				return (
					<li key={post._id}>
						<PostInfo post={post} />
						{isAdmin && adminPage && (
							<AdminControls
								post={post}
								deletePost={deletePost}
								publishPost={publishPost}
								unpublishPost={unpublishPost}
							/>
						)}
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
