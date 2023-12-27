import api from '../../axiosConfig';
import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Posts from '../Posts/Posts';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import styles from './AdminPage.module.css';

// Represents the admin dashboard for admins.
function AdminPage() {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const isAdmin = useSelector((state) => state.isAdmin.value);

	// Fetch all posts stored on the db.
	const fetchData = async () => {
		try {
			const response = await api.get('/post/all-posts');
			setIsLoading(false);
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
			<div className={styles.content}>
				<h2 className={styles.title}>Admin Dashboard</h2>
				<Link to="/edit-post">
					<button className={styles.newButton}>+ New Post</button>
				</Link>
				{isLoading && <Loading />}
				<Posts posts={posts} fetchData={fetchData} adminPage={true} />
			</div>
		</main>
	);
}

export default AdminPage;
