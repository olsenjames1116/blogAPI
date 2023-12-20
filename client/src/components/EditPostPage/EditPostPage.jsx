import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../redux/state/isLoggedInSlice';
import { makeAdmin } from '../../redux/state/isAdminSlice';
import EditPostForm from '../EditPostForm/EditPostForm';
import { useState } from 'react';

function EditPostPage() {
	// const [errors, setErrors] = useState([]);
	const [image, setImage] = useState(null);
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const redirectUser = () => {
		dispatch(logIn());
		navigate('/');
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(
			`${event.target} submitted with image: ${image} title: ${title} text: ${text}`
		);
	};

	const handleChange = (event) => {
		const { id, value } = event.target;

		switch (id) {
			case 'image':
				setImage(value);
				break;
			case 'title':
				setTitle(value);
				break;
			case 'text':
				setText(event.target.getContent());
				break;
			default:
				console.log('None of the form ids matched.');
		}
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
		<main className="editPost">
			<div className="content">
				<h2>Edit Post</h2>
				<EditPostForm handleSubmit={handleSubmit} handleChange={handleChange} />
			</div>
		</main>
	);
}

export default EditPostPage;
