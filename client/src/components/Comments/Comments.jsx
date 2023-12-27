import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import { userImage } from '../../assets/images';
import styles from './Comments.module.css';

// Represents the list of comments on a post.
function Comments({ comments }) {
	return (
		<ul className={styles.comments}>
			{comments.map((comment) => {
				return (
					<li className={styles.comment} key={comment._id}>
						<div className={styles.imageContainer}>
							<img src={userImage} />
						</div>
						<h4 className={styles.username}>{comment.user.username}</h4>
						<span className={styles.date}>
							{DateTime.fromISO(comment.timestamp).toLocaleString(
								DateTime.DATE_MED
							)}
						</span>
						<p className={styles.text}>{comment.text}</p>
					</li>
				);
			})}
		</ul>
	);
}

Comments.propTypes = {
	comments: PropTypes.array,
};

export default Comments;
