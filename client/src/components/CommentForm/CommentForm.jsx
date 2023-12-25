import React from 'react';
import FormMessage from '../FormMessage/FormMessage';
import PropTypes from 'prop-types';

// Represents the form for logged in users to submit comments.
function CommentForm({ message, comments, handleChange, handleSubmit }) {
	return (
		<div className="commentForm">
			<h3>Share your thoughts:</h3>
			<span>{comments.length} Comments</span>
			<form method="POST" action="/api/comment/create" onSubmit={handleSubmit}>
				<textarea
					id="text"
					name="text"
					placeholder="What's on your mind?"
					onChange={handleChange}
				/>
				<FormMessage message={message} />
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

CommentForm.propTypes = {
	message: PropTypes.array,
	comments: PropTypes.array,
	handleChange: PropTypes.func,
	handleSubmit: PropTypes.func,
};

export default CommentForm;
