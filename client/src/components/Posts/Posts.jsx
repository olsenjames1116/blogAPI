import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AdminControls from '../AdminControls/AdminControls';
import PostInfo from '../PostInfo/PostInfo';
import { useSelector } from 'react-redux';

function Posts({ posts, fetchData }) {
	const isAdmin = useSelector((state) => state.isAdmin.value);

	const deletePost = async (post) => {
		try {
			await axios({
				method: 'delete',
				url: `http://localhost:4000/api/post/${post._id}`,
				data: {
					post: post,
				},
				withCredentials: true,
			});
			fetchData();
		} catch (err) {
			console.log(err);
		}
	};

	const publishPost = async (post) => {
		try {
			await axios({
				method: 'put',
				url: `http://localhost:4000/api/post/${post._id}`,
				data: {
					post: { ...post, published: true },
				},
				withCredentials: true,
			});
			fetchData();
		} catch (err) {
			console.log(err);
		}
	};

	const unpublishPost = async (post) => {
		try {
			await axios({
				method: 'put',
				url: `http://localhost:4000/api/post/${post._id}`,
				data: {
					post: { ...post, published: false },
				},
				withCredentials: true,
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
					<li id={post._id} key={post._id}>
						<PostInfo post={post} />
						{isAdmin && (
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

Posts.propTypes = {
	posts: PropTypes.array,
	admin: PropTypes.bool,
	fetchData: PropTypes.func,
};

export default Posts;
