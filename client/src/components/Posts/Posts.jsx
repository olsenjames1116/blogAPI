import React from 'react';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { commentImage } from '../../assets/images';

function Posts({ posts, admin, fetchData }) {
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
						<Link to={`/post/${post._id}`}>
							<div>
								<img src={post.image.file} />
							</div>
							<h3>{post.title}</h3>
							<span>{post.user.username}</span>
							<span>
								{DateTime.fromISO(post.timestamp).toLocaleString(
									DateTime.DATE_MED
								)}
							</span>
							<div>
								<img src={commentImage} />
								<span>{post.comments.length}</span>
							</div>
						</Link>
						{admin && (
							<div>
								<Link to={`/edit-post/${post._id}`}>
									<button type="button">Edit</button>
								</Link>
								<button type="button" onClick={() => deletePost(post)}>
									Delete
								</button>
								{!post.published ? (
									<button type="button" onClick={() => publishPost(post)}>
										Publish
									</button>
								) : (
									<button type="button" onClick={() => unpublishPost(post)}>
										Unpublish
									</button>
								)}
							</div>
						)}
					</li>
				);
			})}
		</ul>
	);
}

Posts.defaultProps = {
	admin: false,
};

Posts.propTypes = {
	posts: PropTypes.array,
	admin: PropTypes.bool,
	fetchData: PropTypes.func,
};

export default Posts;
