import React from 'react';
import styles from './AuthorCredit.module.css';

// Represents the credit to the developer.
function AuthorCredit() {
	return (
		<div className={styles.authorCredit}>
			Built and designed by{' '}
			<a href="https://github.com/olsenjames1116">olsenjames1116</a>
		</div>
	);
}

export default AuthorCredit;
