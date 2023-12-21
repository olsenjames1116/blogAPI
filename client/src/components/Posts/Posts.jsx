import React from 'react';
import { DateTime } from 'luxon';
import PropTypes from 'prop-types';
import { menuImage } from '../../assets/images';
import { Link } from 'react-router-dom';

function Posts({ posts, admin }) {
	const handleClick = ({ target }) => {
		const { id } = target.parentElement.parentElement;
		console.log(id);
	};

	return (
		<ul className="posts">
			{posts.map((post) => {
				return (
					<li id={post._id} key={post._id}>
						{admin && (
							<div>
								<Link to={`/post/${post._id}`}>
									<img src={menuImage} onClick={handleClick} />
								</Link>
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
