import React from 'react';
import PropTypes from 'prop-types';

function FormMessage({ errors, status }) {
	return (
		<>
			{status === 201 ? (
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
	status: PropTypes.number,
};

export default FormMessage;
