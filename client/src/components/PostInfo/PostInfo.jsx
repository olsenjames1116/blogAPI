import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { commentImage } from '../../assets/images';
import { DateTime } from 'luxon';
import styles from './PostInfo.module.css';

// Represents a post on the home page or admin dashboard with the major details of a post.
function PostInfo({ post }) {
	return (
		<div className={styles.postInfo}>
			<Link to={`/post/${post._id}`}>
				<div className={styles.imageContainer}>
					<img className={styles.postImage} src={post.image} />
				</div>
				<h3 className={styles.title}>{post.title}</h3>
				<div className={styles.infoContainer}>
					<span className={styles.username}>{post.user.username}</span>
					<span className={styles.date}>
						{DateTime.fromISO(post.timestamp).toLocaleString(DateTime.DATE_MED)}
					</span>
					<div className={styles.comments}>
						<img src={commentImage} />
						<span>{post.comments ? post.comments.length : 0}</span>
					</div>
				</div>
			</Link>
		</div>
	);
}

PostInfo.propTypes = {
	post: PropTypes.object,
};

export default PostInfo;
