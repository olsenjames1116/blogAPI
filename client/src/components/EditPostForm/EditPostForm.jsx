import React from 'react';
import PropTypes from 'prop-types';
import TinyMCE from '../TinyMCE/TinyMCE';
import { useNavigate } from 'react-router-dom';

// Represents the form that is presented to admins to create and edit posts.
function EditPostForm({ post, handleCreate, handleUpdate, handleChange }) {
	const navigate = useNavigate();

	const cancelEditing = (event) => {
		event.preventDefault();
		navigate('/admin-dashboard');
	};

	return (
		<form
			method="POST"
			action="/api/post/edit"
			onSubmit={post ? handleUpdate : handleCreate}
		>
			{!post && (
				<div>
					<label htmlFor="image">Image:</label>
					<input id="image" name="image" type="file" onChange={handleChange} />
				</div>
			)}
			<div>
				<label htmlFor="title">Title:</label>
				<input
					id="title"
					name="title"
					type="text"
					onChange={handleChange}
					defaultValue={post ? post.title : ''}
				/>
			</div>
			<div>
				<TinyMCE handleChange={handleChange} post={post} />
			</div>
			<div>
				<button type="submit">Submit</button>
				<button type="submit" onClick={cancelEditing}>
					Cancel
				</button>
			</div>
		</form>
	);
}

EditPostForm.propTypes = {
	handleCreate: PropTypes.func,
	handleUpdate: PropTypes.func,
	handleChange: PropTypes.func,
	post: PropTypes.object,
};

export default EditPostForm;
