import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../redux/state/isLoggedInSlice';
import { makeAdmin } from '../../redux/state/isAdminSlice';
import { Editor } from '@tinymce/tinymce-react';

function EditPostPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const redirectUser = () => {
		dispatch(logIn());
		navigate('/');
	};

	useEffect(() => {
		document.title = 'Edit Post';

		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:4000/api/posts', {
					withCredentials: true,
				});
				const { isAdmin } = response.data;
				if (!isAdmin) {
					redirectUser();
				} else {
					dispatch(makeAdmin());
					dispatch(logIn());
				}
			} catch (err) {
				console.log(err);
				navigate('/');
			}
		};

		fetchData();
	});

	return (
		<div>
			<Editor
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
	);
}

export default EditPostPage;
