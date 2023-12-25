import React from 'react';
import { Link } from 'react-router-dom';

// Represents the logo at the top of the page.
function Logo() {
	return (
		<div className="logo">
			<Link to="/">Pub Chair Sports</Link>
		</div>
	);
}

export default Logo;
