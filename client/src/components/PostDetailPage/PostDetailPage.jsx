import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { decode } from 'html-entities';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { userImage } from '../../assets/images';
import FormMessage from '../FormMessage/FormMessage';

function PostDetailPage() {
	const [post, setPost] = useState();
	const [text, setText] = useState();
	const [message, setMessage] = useState([]);
	const [comments, setComments] = useState(null);

	const isLoggedIn = useSelector((state) => state.isLoggedIn.value);

	const { id } = useParams();

	const sortComments = (comments) => {
		return comments.sort((a, b) => {
			if (a.timestamp > b.timestamp) {
				return -1;
			}
			return 1;
		});
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:4000/api/post/${id}`
				);
				const { post } = response.data;
				setPost(post);
				setComments(sortComments(post.comments));
			} catch (err) {
				console.log(err);
			}
		};

		fetchData();
	}, []);

	const handleChange = (event) => {
		setText(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios({
				method: 'post',
				url: `http://localhost:4000/api/comment/create/${id}`,
				data: {
					text: text,
				},
			});
			const { comments } = response.data;
			setComments(sortComments(comments));
			document.querySelector('textarea#text').value = '';
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
			<div className="content">
				{post && (
					<>
						<div>
							<img src={post.image.file} />
						</div>
						<h2>{post.title}</h2>
						{parse(decode(post.text))}
						<div className="comments">
							{isLoggedIn && (
								<div>
									<h3>Share your thoughts:</h3>
									<span>{comments.length} Comments</span>
									<form
										method="POST"
										action="/api/comment/create"
										onSubmit={handleSubmit}
									>
										<textarea
											id="text"
											name="text"
											placeholder="What's on your mind?"
											onChange={handleChange}
										/>
										<FormMessage message={message} />
										<button type="submit">Submit</button>
									</form>
								</div>
							)}
							<ul>
								{comments.map((comment) => {
									return (
										<li key={comment._id}>
											<div>
												<img src={userImage} />
											</div>
											<h4>{comment.user.username}</h4>
											<span>
												{DateTime.fromISO(comment.timestamp).toLocaleString(
													DateTime.DATE_MED
												)}
											</span>
											<p>{comment.text}</p>
										</li>
									);
								})}
							</ul>
						</div>
					</>
				)}
			</div>
		</main>
	);
}

export default PostDetailPage;
