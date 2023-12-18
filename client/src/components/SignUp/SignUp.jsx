import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

function SignUp() {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [success, setSuccess] = useState();

	useEffect(() => {
		document.title = 'Sign Up';
	}, []);

	const clearForm = () => {
		const formInputs = document.querySelectorAll('form input');
		formInputs.forEach((input) => {
			input.value = '';
		});
	};

	const handleSuccess = (errors) => {
		clearForm();
		setErrors(errors);
		setTimeout(() => (window.location.href = '/'), 5000);
	};

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			const response = await axios.post(
				'http://localhost:4000/api/user/sign-up',
				{
					username: username,
					password: password,
					confirmPassword: confirmPassword,
				}
			);
			const { errors, success } = response.data;
			success ? handleSuccess(errors) : setErrors([...errors]);
			setSuccess(success);
		} catch (err) {
			console.log(err);
		}
	};

	const handleChange = (event) => {
		switch (event.target.id) {
			case 'username':
				setUsername(event.target.value);
				break;
			case 'password':
				setPassword(event.target.value);
				break;
			case 'confirmPassword':
				setConfirmPassword(event.target.value);
				break;
			default:
				console.log('None of the form ids matched.');
		}
	};

	return (
		<main className="signUp">
			<div className="content">
				<h2>Sign Up</h2>
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
				{success ? (
					<span>{errors}</span>
				) : (
					<ul>
						{errors.map((error, index) => (
							<li key={index}>{error.msg}</li>
						))}
					</ul>
				)}
			</div>
		</main>
	);
}

export default SignUp;
