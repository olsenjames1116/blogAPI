import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/state/isLoggedInSlice';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const redirectUser = () => {
		dispatch(logIn());
		navigate('/');
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:4000/api/posts', {
					withCredentials: true,
				});
				const { isAdmin } = response.data;
				if (!isAdmin) redirectUser();
			} catch (err) {
				console.log(err);
				navigate('/');
			}
		};

		fetchData();
	});

	return (
		<main className="admin">
			<div className="content">
				<h2>Admin Dashboard</h2>
			</div>
		</main>
	);
}

export default AdminPage;
