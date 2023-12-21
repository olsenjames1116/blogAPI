import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../../redux/state/isLoggedInSlice';
import { makeAdmin } from '../../redux/state/isAdminSlice';
import EditPostForm from '../EditPostForm/EditPostForm';

function EditPostPage() {
	// const [errors, setErrors] = useState([]);
	const [image, setImage] = useState(null);
	const [imageBase64, setImageBase64] = useState(null);
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const removeImage = () => {
		setImage(null);
		document.querySelector('input#image').value = null;
	};

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			const response = await axios({
				method: 'post',
				url: 'http://localhost:4000/api/post/create',
				withCredentials: true,
				data: {
					image: imageBase64,
					title: title,
					text: text,
				},
			});
			const { status } = response;
			console.log(status);
		} catch (err) {
			console.log(err);
		}
	};

	const convertToBase64 = async (image) => {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(image);
			fileReader.onload = () => {
				resolve(fileReader.result);
			};
			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	};

	const handleChange = async (event) => {
		const { id, value, files } = event.target;

		switch (id) {
			case 'image':
				setImageBase64(await convertToBase64(files[0]));
				setImage(files[0]);
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
		<main className="editPost">
			<div className="content">
				<h2>Edit Post</h2>
				{image && (
					<div>
						<img width="250px" src={URL.createObjectURL(image)} />
						<button type="button" onClick={removeImage}>
							Remove
						</button>
					</div>
				)}
				<EditPostForm handleSubmit={handleSubmit} handleChange={handleChange} />
			</div>
		</main>
	);
}

export default EditPostPage;
