import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function AdminControls({ post, deletePost, publishPost, unpublishPost }) {
	return (
		<div className="adminControls">
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
	);
}

AdminControls.propTypes = {
	post: PropTypes.object,
	deletePost: PropTypes.func,
	publishPost: PropTypes.func,
	unpublishPost: PropTypes.func,
};

export default AdminControls;
