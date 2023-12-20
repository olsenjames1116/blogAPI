import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';

function EditPostForm({ handleSubmit, handleChange }) {
	return (
		<form method="POST" action="/api/post/edit" onSubmit={handleSubmit}>
			<div>
				<label htmlFor="image">Image:</label>
				<input id="image" name="image" type="file" onChange={handleChange} />
			</div>
			<div>
				<label htmlFor="title">Title:</label>
				<input id="title" name="title" type="text" onChange={handleChange} />
			</div>
			<div>
				<Editor
					id="text"
					name="text"
					onChange={handleChange}
					apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
					init={{
						plugins:
							'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
						toolbar:
							'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
						tinycomments_mode: 'embedded',
						tinycomments_author: 'Author name',
						mergetags_list: [
							{ value: 'First.Name', title: 'First Name' },
							{ value: 'Email', title: 'Email' },
						],
						ai_request: (request, respondWith) =>
							respondWith.string(() =>
								Promise.reject('See docs to implement AI Assistant')
							),
					}}
					initialValue="Welcome to TinyMCE!"
				/>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}

EditPostForm.propTypes = {
	handleSubmit: PropTypes.func,
	handleChange: PropTypes.func,
};

export default EditPostForm;
