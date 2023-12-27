import React from 'react';
import PropTypes from 'prop-types';
import TinyMCE from '../TinyMCE/TinyMCE';
import { useNavigate } from 'react-router-dom';
import styles from './EditPostForm.module.css';

// Represents the form that is presented to admins to create and edit posts.
function EditPostForm({
	post,
	handleCreate,
	handleUpdate,
	handleChange,
	handlePublish,
	handleUnpublish,
}) {
	const navigate = useNavigate();

	const cancelEditing = (event) => {
		event.preventDefault();
		navigate('/admin-dashboard');
	};

	return (
		<form
			className={styles.editPostForm}
			method="POST"
			action="/api/post/edit"
			onSubmit={post ? handleUpdate : handleCreate}
		>
			{!post && (
				<div className={`${styles.formField} ${styles.imageContainer}`}>
					<label htmlFor="image">Image:</label>
					<input id="image" name="image" type="file" onChange={handleChange} />
				</div>
			)}
			<div className={`${styles.formField} ${styles.title}`}>
				<label htmlFor="title">Title:</label>
				<input
					id="title"
					name="title"
					type="text"
					onChange={handleChange}
					defaultValue={post ? post.title : ''}
				/>
			</div>
			<div className={styles.textEditor}>
				<TinyMCE handleChange={handleChange} post={post} />
			</div>
			<div className={styles.buttonContainer}>
				{!post ? (
					<div className={styles.create}>
						<button type="submit" onClick={handlePublish}>
							Create & Publish
						</button>
						<button type="submit" onClick={handleUnpublish}>
							{/* eslint-disable-next-line react/no-unescaped-entities*/}
							Create & Don't Publish
						</button>
					</div>
				) : (
					<div className={styles.create}>
						<button type="submit" onClick={handlePublish}>
							Update & Publish
						</button>
						<button type="submit" onClick={handleUnpublish}>
							{/* eslint-disable-next-line react/no-unescaped-entities*/}
							Update & Don't Publish
						</button>
					</div>
				)}
				<button className={styles.cancel} type="submit" onClick={cancelEditing}>
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
	handlePublish: PropTypes.func,
	handleUnpublish: PropTypes.func,
	post: PropTypes.object,
};

export default EditPostForm;
