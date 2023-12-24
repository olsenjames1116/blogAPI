import React from 'react';
import PropTypes from 'prop-types';

// Represents the image display from the image input.
function DynamicImageDisplay({ image, removeImage }) {
	return (
		<div className="dynamicImageDisplay">
			<img width="250px" src={URL.createObjectURL(image)} />
			<button type="button" onClick={removeImage}>
				Remove
			</button>
		</div>
	);
}

DynamicImageDisplay.propTypes = {
	image: PropTypes.object,
	removeImage: PropTypes.func,
};

export default DynamicImageDisplay;
