import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logo.module.css';
import { barstoolImage } from '../../assets/images';

// Represents the logo at the top of the page.
function Logo() {
	return (
		<div className={styles.logo}>
			<Link to="/">
				<img src={barstoolImage} />
				<span>Pub Chair Sports</span>
			</Link>
		</div>
	);
}

export default Logo;
