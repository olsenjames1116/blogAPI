import React from 'react';
import PropTypes from 'prop-types';

function SignUpForm({ handleChange, handleSubmit }) {
	return (
		<form method="POST" action="/api/user/sign-up" onSubmit={handleSubmit}>
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
			<div>
				<label htmlFor="confirmPassword">Confirm Password:</label>
				<input
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					onChange={handleChange}
				/>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
}

SignUpForm.propTypes = {
	handleChange: PropTypes.func,
	handleSubmit: PropTypes.func,
};

export default SignUpForm;
