import React from 'react';
import PropTypes from 'prop-types';
import { decode } from 'html-entities';
import parse from 'html-react-parser';

// Represents the details of a post stored in the db.
function PostDetail({ post }) {
	return (
		<div className="postDetail">
			<div>
				<img src={post.image.file} />
			</div>
			<h2>{post.title}</h2>
			{parse(decode(post.text))}
		</div>
	);
}

PostDetail.propTypes = {
	post: PropTypes.object,
};

export default PostDetail;
