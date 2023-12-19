import React from 'react';
import { Link } from 'react-router-dom';

function Links() {
	return (
		<ul className="links">
			<li>
				<Link to="/log-in">Log In</Link>
				<Link to="/sign-up">Sign Up</Link>
			</li>
		</ul>
	);
}

export default Links;
