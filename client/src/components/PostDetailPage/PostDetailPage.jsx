import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { decode } from 'html-entities';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import { userImage } from '../../assets/images';

function PostDetailPage() {
	const [post, setPost] = useState();
	const [text, setText] = useState();

	const isLoggedIn = useSelector((state) => state.isLoggedIn.value);

	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://localhost:4000/api/post/${id}`,
					{
						withCredentials: true,
					}
				);
				const { post } = response.data;
				setPost(post);
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
			await axios({
				method: 'post',
				url: `http://localhost:4000/api/comment/create/${id}`,
				data: {
					text: text,
				},
				withCredentials: true,
			});
			navigate(`/post/${id}`);
		} catch (err) {
			console.log(err);
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
									<span>{post.comments.length} Comments</span>
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
										<button type="submit">Submit</button>
									</form>
								</div>
							)}
							<ul>
								{post.comments.map((comment) => {
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
