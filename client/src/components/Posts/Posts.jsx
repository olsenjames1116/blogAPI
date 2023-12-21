import React from 'react';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import { menuImage } from '../../assets/images';

function Posts({ posts, admin }) {
	return (
		<ul className="posts">
			{posts.map((post) => {
				return (
					<li key={post._id}>
						{admin && (
							<div>
								<img src={menuImage} />
							</div>
						)}
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

Posts.defaultProps = {
	admin: false,
};

Posts.propTypes = {
	posts: PropTypes.array,
	admin: PropTypes.bool,
};

export default Posts;
