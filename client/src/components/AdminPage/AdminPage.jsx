import api from '../../axiosConfig';
import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Posts from '../Posts/Posts';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function AdminPage() {
	const [posts, setPosts] = useState([]);

	const isAdmin = useSelector((state) => state.isAdmin.value);

	const fetchData = async () => {
		try {
			const response = await api.get('/post/all-posts');
			const { posts } = response.data;
			setPosts(posts);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		document.title = 'Admin Dashboard';

		fetchData();
	}, []);

	return (
		<main className="admin">
			{!isAdmin && <Navigate to="/" replace />}
			<div className="content">
				<h2>Admin Dashboard</h2>
				<Link to="/edit-post">
					<button>+ New Post</button>
				</Link>
				<Posts posts={posts} fetchData={fetchData} adminPage={true} />
			</div>
		</main>
	);
}

export default AdminPage;
