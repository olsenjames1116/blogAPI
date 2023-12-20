import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/state/isLoggedInSlice';
import axios from 'axios';
import { removeAdmin } from '../../redux/state/isAdminSlice';
// import Cookies from 'universal-cookie';

function Links() {
	const isLoggedIn = useSelector((state) => state.isLoggedIn.value);
	const isAdmin = useSelector((state) => state.isAdmin.value);

	const dispatch = useDispatch();

	// const cookies = new Cookies();

	const logOutUser = async () => {
		// cookies.remove('accessToken');
		try {
			await axios.get('http://localhost:4000/api/user/log-out', {
				withCredentials: true,
			});
		} catch (err) {
			console.log(err);
		}

		dispatch(logOut());
		dispatch(removeAdmin());
	};

	return (
		<ul className="links">
			{!isLoggedIn && (
				<li>
					<Link to="/log-in">Log In</Link>
				</li>
			)}
			{!isLoggedIn && (
				<li>
					<Link to="/sign-up">Sign Up</Link>
				</li>
			)}
			{isAdmin && (
				<li>
					<Link to="/admin-page">Admin</Link>
				</li>
			)}
			{isLoggedIn && (
				<li>
					<Link to="/" onClick={logOutUser}>
						Log Out
					</Link>
				</li>
			)}
		</ul>
	);
}

export default Links;
