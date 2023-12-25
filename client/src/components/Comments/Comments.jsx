import React from 'react';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';
import { userImage } from '../../assets/images';

// Represents the list of comments on a post.
function Comments({ comments }) {
	return (
		<ul className="comments">
			{comments.map((comment) => {
				return (
					<li key={comment._id}>
						<div>
							<img src={userImage} />
						</div>
						<h4>{comment.user.username}</h4>
						<span>
							{DateTime.fromISO(comment.timestamp).toLocaleString(
								DateTime.DATE_MED
							)}
						</span>
						<p>{comment.text}</p>
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
