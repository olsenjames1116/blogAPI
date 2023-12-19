import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Links() {
	const isLoggedIn = useSelector((state) => state.isLoggedIn.value);

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
		</ul>
	);
}

export default Links;
