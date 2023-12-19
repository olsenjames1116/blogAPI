import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import SignUpForm from '../SignUpForm/SignUpForm';
import FormMessage from '../FormMessage/FormMessage';

function SignUpPage() {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [status, setStatus] = useState();

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
		setTimeout(() => (window.location.href = '/log-in'), 3000);
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
			const { errors } = response.data;
			const { status } = response;
			status === 201 ? handleSuccess(errors) : setErrors([...errors]);
			setStatus(status);
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
				<SignUpForm handleChange={handleChange} handleSubmit={handleSubmit} />
				<FormMessage errors={errors} status={status} />
			</div>
		</main>
	);
}

export default SignUpPage;
