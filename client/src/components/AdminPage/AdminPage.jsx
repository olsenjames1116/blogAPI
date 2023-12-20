import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/state/isLoggedInSlice';
import { useNavigate, Link } from 'react-router-dom';
import { makeAdmin } from '../../redux/state/isAdminSlice';

function AdminPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const redirectUser = () => {
		dispatch(logIn());
		navigate('/');
	};

	useEffect(() => {
		document.title = 'Admin Dashboard';

		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:4000/api/posts', {
					withCredentials: true,
				});
				const { isAdmin } = response.data;
				if (!isAdmin) {
					redirectUser();
				} else {
					dispatch(makeAdmin());
					dispatch(logIn());
				}
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
				<Link to="/edit-post">
					<button>+ New Post</button>
				</Link>
			</div>
		</main>
	);
}

export default AdminPage;
