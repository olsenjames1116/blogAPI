import React from 'react';
import { useEffect, useState } from 'react';
import api from '../../axiosConfig';
import Posts from '../Posts/Posts';
import Loading from '../Loading/Loading';
import './HomePage.module.css';

// Represents the home page that displays all the published posts.
function HomePage() {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		document.title = 'Pub Chair Sports';

		const fetchData = async () => {
			try {
				const response = await api.get('/post/posts');
				setIsLoading(false);
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
				{isLoading && <Loading />}
				<Posts posts={posts} />
			</div>
		</main>
	);
}

export default HomePage;
