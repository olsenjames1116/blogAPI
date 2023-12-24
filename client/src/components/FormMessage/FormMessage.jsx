import React from 'react';
import PropTypes from 'prop-types';

// Represents the message to be displayed around forms. Either contains errors or a message from the server.
function FormMessage({ message, status }) {
	return (
		<div className="formMessage">
			{status === 201 ? (
				<span className="success">{message}</span>
			) : (
				<ul className="errors">
					{message.map((message, index) => (
						<li key={index}>{message.msg}</li>
					))}
				</ul>
			)}
		</div>
	);
}

FormMessage.propTypes = {
	message: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	status: PropTypes.number,
};

export default FormMessage;
