import React from 'react';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Posts({ posts, admin }) {
	const navigate = useNavigate();

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
			post.published = true;
			navigate('/admin-dashboard');
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
			post.published = false;
			navigate('/admin-dashboard');
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
						</Link>
						{admin && (
							<div>
								<button type="button">Edit</button>
								<button type="button">Delete</button>
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
};

export default Posts;
