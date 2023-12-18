import React from 'react';
import Logo from '../Logo/Logo';

function Header() {
	return (
		<header>
			<nav>
				<Logo />
				<ul className="links">
					<li>
						<a href="/sign-up">Sign Up</a>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
