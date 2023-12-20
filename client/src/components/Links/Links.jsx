import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/state/isLoggedInSlice';
import axios from 'axios';
// import Cookies from 'universal-cookie';

function Links() {
	const isLoggedIn = useSelector((state) => state.isLoggedIn.value);

	const dispatch = useDispatch();

	// const cookies = new Cookies();

	const logOutUser = async () => {
		// cookies.remove('accessToken');

		dispatch(logOut());
		try {
			await axios.get('http://localhost:4000/api/user/log-out', {
				withCredentials: true,
			});
		} catch (err) {
			console.log(err);
		}
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
