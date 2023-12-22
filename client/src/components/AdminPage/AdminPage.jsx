import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Posts from '../Posts/Posts';
import { useState } from 'react';

function AdminPage() {
	const [posts, setPosts] = useState([]);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				'http://localhost:4000/api/post/all-posts',
				{
					withCredentials: true,
				}
			);
			const { posts } = response.data;
			setPosts(posts);
		} catch (err) {
			console.log(err.response.data);
		}
	};

	useEffect(() => {
		document.title = 'Admin Dashboard';

		fetchData();
	}, []);

	return (
		<main className="admin">
			<div className="content">
				<h2>Admin Dashboard</h2>
				<Link to="/edit-post">
					<button>+ New Post</button>
				</Link>
				<Posts posts={posts} fetchData={fetchData} />
			</div>
		</main>
	);
}

export default AdminPage;
