import api from '../../axiosConfig';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import EditPostForm from '../EditPostForm/EditPostForm';
import DynamicImageDisplay from '../DynamicImageDisplay/DynamicImageDisplay';
import FormMessage from '../FormMessage/FormMessage';
import styles from './EditPostPage.module.css';

// Represents the page where an admin can edit existing and create new posts.
function EditPostPage() {
	const [message, setMessage] = useState([]);
	const [image, setImage] = useState(null);
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');
	const [published, setPublished] = useState(false);
	const [post, setPost] = useState();

	const isAdmin = useSelector((state) => state.isAdmin.value);

	const navigate = useNavigate();

	const { id } = useParams();

	// Loads a post to edit if the page was reached with a post to edit.
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Removes the image input and dynamic image display if the user selects to remove it.
	const removeImage = () => {
		setImage(null);
		document.querySelector('input#image').value = null;
	};

	const handlePublish = () => {
		setPublished(true);
	};

	const handleUnpublish = () => {
		setPublished(false);
	};

	// Creates a new post in the db.
	const handleCreate = async (event) => {
		event.preventDefault();
		try {
			const response = await api.post('/post/create', {
				image: image,
				title: title,
				text: text,
				published: published,
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

	// Updates an existing post in the db.
	const handleUpdate = async (event) => {
		event.preventDefault();

		// If the user does not input any new data, store the existing data.
		const updatedTitle = !title ? post.title : title;
		let updatedText;
		if (!text) {
			updatedText = post.text;
			updatedText = updatedText.substring(9, updatedText.length - 15);
		} else {
			updatedText = text;
		}

		try {
			const response = await api.put(`/post/${post._id}`, {
				post: {
					...post,
					title: updatedTitle,
					text: updatedText,
					published: published,
				},
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

	// Displays the image selected by the user as a preview.
	const displayPreviewImage = (image) => {
		const reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onloadend = () => {
			setImage(reader.result);
		};
	};

	// Reached when the user interacts with the input fields to store data in state.
	const handleChange = async (event) => {
		const { id, value, files } = event.target;

		// Switch to store the input based on which input field the user interacted with.
		switch (id) {
			case 'image':
				displayPreviewImage(files[0]);
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
		<main className={styles.editPost}>
			{!isAdmin && <Navigate to="/" replace />}
			<div className={styles.content}>
				<h2 className={styles.title}>Edit Post</h2>
				<FormMessage message={message} />
				{image && (
					<DynamicImageDisplay image={image} removeImage={removeImage} />
				)}
				<EditPostForm
					post={post}
					handleCreate={handleCreate}
					handleUpdate={handleUpdate}
					handleChange={handleChange}
					handlePublish={handlePublish}
					handleUnpublish={handleUnpublish}
				/>
			</div>
		</main>
	);
}

export default EditPostPage;
