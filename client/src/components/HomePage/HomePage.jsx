import React from 'react';
import { useEffect, useState } from 'react';
import api from '../../axiosConfig';
import Posts from '../Posts/Posts';

// Represents the home page that displays all the published posts.
function HomePage() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		document.title = 'Pub Chair Sports';

		const fetchData = async () => {
			try {
				const response = await api.get('/post/posts');
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
