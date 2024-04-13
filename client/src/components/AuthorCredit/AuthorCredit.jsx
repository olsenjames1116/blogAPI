import React from 'react';
import styles from './AuthorCredit.module.css';

// Represents the credit to the developer.
function AuthorCredit() {
	return (
		<div className={styles.authorCredit}>
			© 2024 James Olsen. All Rights Reserved.
			<p>
				Built and designed by{' '}
				<a href="https://github.com/olsenjames1116">olsenjames1116</a>
			</p>
		</div>
	);
}

export default AuthorCredit;
