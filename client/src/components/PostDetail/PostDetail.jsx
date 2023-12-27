import React from 'react';
import PropTypes from 'prop-types';
import { decode } from 'html-entities';
import parse from 'html-react-parser';
import styles from './PostDetail.module.css';

// Represents the details of a post stored in the db.
function PostDetail({ post }) {
	return (
		<div className={styles.detail}>
			<h2 className={styles.title}>{post.title}</h2>
			<div className={styles.imageContainer}>
				<img src={post.image.file} />
			</div>
			{parse(decode(post.text))}
		</div>
	);
}

PostDetail.propTypes = {
	post: PropTypes.object,
};

export default PostDetail;
