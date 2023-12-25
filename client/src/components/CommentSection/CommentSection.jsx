import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import CommentForm from '../CommentForm/CommentForm';
import Comments from '../Comments/Comments';

// Represents the section to display the form for submitting comments and the list of comments.
function CommentSection({ message, comments, handleChange, handleSubmit }) {
	const isLoggedIn = useSelector((state) => state.isLoggedIn.value);

	return (
		<div className="comments">
			{isLoggedIn && (
				<CommentForm
					message={message}
					comments={comments}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
				/>
			)}
			<Comments comments={comments} />
		</div>
	);
}

CommentSection.propTypes = {
	message: PropTypes.array,
	comments: PropTypes.array,
	handleChange: PropTypes.func,
	handleSubmit: PropTypes.func,
};

export default CommentSection;
