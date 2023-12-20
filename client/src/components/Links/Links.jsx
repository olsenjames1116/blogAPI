import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/state/isLoggedInSlice';

function Links() {
	const isLoggedIn = useSelector((state) => state.isLoggedIn.value);

	const dispatch = useDispatch();

	const logOutUser = () => {
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
