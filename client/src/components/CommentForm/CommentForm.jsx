import React from 'react';
import FormMessage from '../FormMessage/FormMessage';
import PropTypes from 'prop-types';
import styles from './CommentForm.module.css';

// Represents the form for logged in users to submit comments.
function CommentForm({ message, comments, handleChange, handleSubmit }) {
	return (
		<div className={styles.commentForm}>
			<h3 className={styles.title}>Share your thoughts:</h3>
			<span>{comments.length} Comments</span>
			<form method="POST" action="/api/comment/create" onSubmit={handleSubmit}>
				<textarea
					id="text"
					name="text"
					placeholder="What's on your mind?"
					rows="10"
					cols="50"
					onChange={handleChange}
					className={styles.text}
				/>
				<FormMessage message={message} />
				<button className={styles.create} type="submit">
					Submit
				</button>
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
