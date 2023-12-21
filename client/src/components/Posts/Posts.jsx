import React from 'react';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';

function Posts({ posts }) {
	return (
		<ul className="posts">
			{posts.map((post) => {
				return (
					<li key={post._id}>
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
					</li>
				);
			})}
		</ul>
	);
}

Posts.propTypes = {
	posts: PropTypes.array,
};

export default Posts;
