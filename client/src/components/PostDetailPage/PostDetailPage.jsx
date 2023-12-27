import api from '../../axiosConfig';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostDetail from '../PostDetail/PostDetail';
import CommentSection from '../CommentSection/CommentSection';
import styles from './PostDetailPage.module.css';
import Loading from '../Loading/Loading';

// Represents the detail page for each post.
function PostDetailPage() {
	const [post, setPost] = useState();
	const [text, setText] = useState();
	const [message, setMessage] = useState([]);
	const [comments, setComments] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const { id } = useParams();

	// Sorts comments from newest to oldest.
	const sortComments = (comments) => {
		return comments.sort((a, b) => {
			if (a.timestamp > b.timestamp) {
				return -1;
			}
			return 1;
		});
	};

	// Fetch the selected post from the db.
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get(`/post/${id}`);
				setIsLoading(false);
				const { post } = response.data;
				setPost(post);
				document.title = post.title;
				setComments(sortComments(post.comments));
			} catch (err) {
				console.log(err);
			}
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Reached when a change has been made to comments to store in state.
	const handleChange = (event) => {
		setText(event.target.value);
	};

	// Submits the comment to the db.
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await api.post(`/comment/create/${id}`, {
				text: text,
			});
			const { comments } = response.data;
			setComments(sortComments(comments));
			document.querySelector('textarea#text').value = '';
			setText('');
			setMessage([]);
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

	return (
		<main className="postDetail">
			<div className={styles.content}>
				{isLoading && <Loading />}
				{post && (
					<div className={styles.post}>
						<PostDetail post={post} />
						<CommentSection
							comments={comments}
							message={message}
							handleChange={handleChange}
							handleSubmit={handleSubmit}
						/>
					</div>
				)}
			</div>
		</main>
	);
}

export default PostDetailPage;
