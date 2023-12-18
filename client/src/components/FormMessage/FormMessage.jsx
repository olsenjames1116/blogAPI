import React from 'react';
import PropTypes from 'prop-types';

function FormMessage({ errors, success }) {
	return (
		<>
			{success ? (
				<span className="success">{errors}</span>
			) : (
				<ul className="errors">
					{errors.map((error, index) => (
						<li key={index}>{error.msg}</li>
					))}
				</ul>
			)}
		</>
	);
}

FormMessage.propTypes = {
	errors: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	success: PropTypes.bool,
};

export default FormMessage;
