import React from 'react';
import PropTypes from 'prop-types';
import styles from './LogInForm.module.css';

// Represents the form that the user uses to log in.
function LogInForm({ handleChange, handleSubmit }) {
	return (
		<form
			className={styles.logInForm}
			method="POST"
			action="/api/user/log-in"
			onSubmit={handleSubmit}
		>
			<div className={styles.formField}>
				<label htmlFor="username">Username:</label>
				<input
					id="username"
					name="username"
					type="text"
					onChange={handleChange}
				/>
			</div>
			<div className={styles.formField}>
				<label htmlFor="password">Password:</label>
				<input
					id="password"
					name="password"
					type="password"
					onChange={handleChange}
				/>
			</div>
			<button className={styles.create} type="submit">
				Submit
			</button>
		</form>
	);
}

LogInForm.propTypes = {
	handleChange: PropTypes.func,
	handleSubmit: PropTypes.func,
};

export default LogInForm;
