import React from 'react';
import Logo from '../Logo/Logo';
import Links from '../Links/Links';
import './Header.module.css';

// Represents the header at the top of each page.
function Header() {
	return (
		<header>
			<nav>
				<Logo />
				<Links />
			</nav>
		</header>
	);
}

export default Header;
