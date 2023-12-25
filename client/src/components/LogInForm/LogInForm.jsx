import React from 'react';
import PropTypes from 'prop-types';

// Represents the form that the user uses to log in.
function LogInForm({ handleChange, handleSubmit }) {
	return (
		<form method="POST" action="/api/user/log-in" onSubmit={handleSubmit}>
			<div>
				<label htmlFor="username">Username:</label>
				<input
					id="username"
					name="username"
					type="text"
					onChange={handleChange}
				/>
			</div>
			<div>
				<label htmlFor="password">Password:</label>
				<input
					id="password"
					name="password"
					type="password"
					onChange={handleChange}
				/>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}

LogInForm.propTypes = {
	handleChange: PropTypes.func,
	handleSubmit: PropTypes.func,
};

export default LogInForm;
