import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/state/isLoggedInSlice';
import Cookies from 'universal-cookie';

function Links() {
	const isLoggedIn = useSelector((state) => state.isLoggedIn.value);

	const dispatch = useDispatch();

	const cookies = new Cookies();

	const logOutUser = () => {
		console.log(cookies.get('accessToken'));
		cookies.remove('accessToken');
		console.log(cookies.get('accessToken'));

		dispatch(logOut());
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
