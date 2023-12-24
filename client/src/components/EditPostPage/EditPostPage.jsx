import api from '../../axiosConfig';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import EditPostForm from '../EditPostForm/EditPostForm';
import DynamicImageDisplay from '../DynamicImageDisplay/DynamicImageDisplay';
import FormMessage from '../FormMessage/FormMessage';

function EditPostPage() {
	const [message, setMessage] = useState([]);
	const [image, setImage] = useState(null);
	const [imageBase64, setImageBase64] = useState(null);
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [post, setPost] = useState();

	const isAdmin = useSelector((state) => state.isAdmin.value);

	const navigate = useNavigate();

	const { id } = useParams();

	const loadData = async () => {
		try {
			const response = await api.get(`/post/${id}`);
			const { post } = response.data;
			setPost(post);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		document.title = 'Edit Post';

		id && loadData();
	}, []);

	const removeImage = () => {
		setImage(null);
		document.querySelector('input#image').value = null;
	};

	const handleCreate = async (event) => {
		event.preventDefault();
		try {
			const response = await api.post('/post/create', {
				image: imageBase64,
				title: title,
				text: text,
			});
			const { id } = response.data;
			navigate(`/post/${id}`);
		} catch (err) {
			const { status } = err.response;
			if (status === 400) {
				const { message } = err.response.data;
				setMessage(message);
			} else {
				console.log(err);
			}
		}
	};

	const handleUpdate = async (event) => {
		event.preventDefault();

		const updatedTitle = !title ? post.title : title;
		let updatedText;
		console.log(post.text);
		if (!text) {
			updatedText = post.text;
			updatedText = updatedText.substring(9, updatedText.length - 15);
			console.log(updatedText);
		} else {
			updatedText = text;
		}

		try {
			const response = await api.put(`/post/${post._id}`, {
				post: { ...post, title: updatedTitle, text: updatedText },
			});
			const { id } = response.data;
			navigate(`/post/${id}`);
		} catch (err) {
			const { status } = err.response;
			if (status === 400) {
				const { message } = err.response.data;
				setMessage(message);
			} else {
				console.log(err);
			}
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

	return (
		<main className="editPost">
			{!isAdmin && <Navigate to="/" replace />}
			<div className="content">
				<h2>Edit Post</h2>
				<FormMessage message={message} />
				{image && (
					<DynamicImageDisplay image={image} removeImage={removeImage} />
				)}
				<EditPostForm
					post={post}
					handleCreate={handleCreate}
					handleUpdate={handleUpdate}
					handleChange={handleChange}
				/>
			</div>
		</main>
	);
}

export default EditPostPage;
