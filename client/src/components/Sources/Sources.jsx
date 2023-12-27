import React from 'react';
import styles from './Sources.module.css';

// Represents the sources in the footer of the page.
function Sources() {
	return (
		<div className={styles.sources}>
			Images provided by <a href="https://icons8.com/icons">Icons8</a>
		</div>
	);
}

export default Sources;
