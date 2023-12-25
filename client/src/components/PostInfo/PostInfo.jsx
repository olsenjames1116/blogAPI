import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { commentImage } from '../../assets/images';
import { DateTime } from 'luxon';

// Represents a post on the home page or admin dashboard with the major details of a post.
function PostInfo({ post }) {
	return (
		<div className="postInfo">
			<Link to={`/post/${post._id}`}>
				<div>
					<img src={post.image.file} />
				</div>
				<h3>{post.title}</h3>
				<span>{post.user.username}</span>
				<span>
					{DateTime.fromISO(post.timestamp).toLocaleString(DateTime.DATE_MED)}
				</span>
				<div>
					<img src={commentImage} />
					<span>{post.comments ? post.comments.length : 0}</span>
				</div>
			</Link>
		</div>
	);
}

PostInfo.propTypes = {
	post: PropTypes.object,
};

export default PostInfo;
