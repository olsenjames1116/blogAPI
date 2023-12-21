import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { makeAdmin } from '../../redux/state/isAdminSlice';
import Posts from '../Posts/Posts';

function HomePage() {
	const [posts, setPosts] = useState([]);

	const dispatch = useDispatch();

	useEffect(() => {
		document.title = 'Pub Chair Sports';

		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:4000/api/posts', {
					withCredentials: true,
				});
				const { isAdmin, posts } = response.data;
				isAdmin && dispatch(makeAdmin());
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
