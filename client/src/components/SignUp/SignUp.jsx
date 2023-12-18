import React from 'react';

function SignUp() {
	return (
		<main className="signUp">
			<form method="POST" action="/api/user/sign-up">
				<div>
					<label htmlFor="username">Username:</label>
					<input id="username" name="username" type="text" />
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<input id="password" name="password" type="password" />
				</div>
				<div>
					<label htmlFor="confirmPassword">Confirm Password:</label>
					<input id="confirmPassword" name="confirmPassword" type="password" />
				</div>
				<button type="submit">Submit</button>
			</form>
		</main>
	);
}

export default SignUp;
