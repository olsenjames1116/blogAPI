import React from 'react';
import { loadingImage } from '../../assets/images';

function Loading() {
	return (
		<div className="loading">
			<span>Loading...</span>
			<img src={loadingImage} />
		</div>
	);
}

export default Loading;
