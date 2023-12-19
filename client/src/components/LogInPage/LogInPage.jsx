import React from 'react';
import LogInForm from '../LogInForm/LogInForm';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

function LogInPage() {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [success, setSuccess] = useState();

	useEffect(() => {
		document.title = 'Log In';
	}, []);

	const handleSuccess = () => {
		window.location.href = '/';
	};

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			const response = await axios.post(
				'http://localhost:4000/api/user/log-in',
				{
					username: username,
					password: password,
				}
			);
			const { errors, success } = response.data;
			success ? handleSuccess() : setErrors([...errors]);
			setSuccess(success);
		} catch (err) {
			console.log(err);
		}
	};

	const handleChange = (event) => {
		switch (event.target.id) {
			case 'username':
				setUsername(event.targer.value);
				break;
			case 'password':
				setPassword(event.target.value);
				break;
			default:
				console.log('None of the form ids matched.');
		}
	};

	return (
		<main className="logIn">
			<div className="content">
				<h2>Log In</h2>
				<LogInForm handleChange={handleChange} handleSubmit={handleSubmit} />
			</div>
		</main>
	);
}

export default LogInPage;
