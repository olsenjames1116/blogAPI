import React from 'react';
import Logo from '../Logo/Logo';
import Links from '../Links/Links';

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
