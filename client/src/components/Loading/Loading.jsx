import React from 'react';
import { loadingImage } from '../../assets/images';
import styles from './Loading.module.css';

// Represents the loading component that is displayed when content is loading.
function Loading() {
	return (
		<div className={styles.loading}>
			<span>Loading...</span>
			<img src={loadingImage} alt="" />
		</div>
	);
}

export default Loading;
