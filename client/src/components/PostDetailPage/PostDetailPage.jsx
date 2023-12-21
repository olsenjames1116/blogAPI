import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { decode } from 'html-entities';
import parse from 'html-react-parser';

function PostDetailPage() {
	const [post, setPost] = useState();

	const { id } = useParams();

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
					</>
				)}
			</div>
		</main>
	);
}

export default PostDetailPage;
