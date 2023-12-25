import React from 'react';
import { loadingImage } from '../../assets/images';

// Represents the loading component that is displayed when content is loading.
function Loading() {
	return (
		<div className="loading">
			<span>Loading...</span>
			<img src={loadingImage} />
		</div>
	);
}

export default Loading;
