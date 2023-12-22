import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Posts from '../Posts/Posts';

function HomePage() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		document.title = 'Pub Chair Sports';

		const fetchData = async () => {
			try {
				const response = await axios.get(
					'http://localhost:4000/api/post/posts',
					{
						withCredentials: true,
					}
				);
				const { posts } = response.data;
				setPosts(posts);
			} catch (err) {
				console.log(err);
			}
		};

		fetchData();
	}, []);

	return (
		<main className="home">
			<div className="content">
				<Posts posts={posts} />
			</div>
		</main>
	);
}

export default HomePage;
