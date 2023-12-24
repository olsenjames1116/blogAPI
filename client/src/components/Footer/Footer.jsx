import React from 'react';
import AuthorCredit from '../AuthorCredit/AuthorCredit';
import Sources from '../Sources/Sources';

// Represents the footer at the bottom of the page.
function Footer() {
	return (
		<footer>
			<AuthorCredit />
			<Sources />
		</footer>
	);
}

export default Footer;
