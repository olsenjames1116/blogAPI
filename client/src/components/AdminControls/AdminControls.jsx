import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './AdminControls.module.css';

// Represents the controls that appear to an admin on the dashboard.
function AdminControls({ post, deletePost, publishPost, unpublishPost }) {
	return (
		<div className={styles.adminControls}>
			<Link to={`/edit-post/${post._id}`}>
				<button className={styles.edit} type="button">
					Edit
				</button>
			</Link>
			<button
				className={styles.delete}
				type="button"
				onClick={() => deletePost(post)}
			>
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
