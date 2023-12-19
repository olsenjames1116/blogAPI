import React from 'react';
import LogInForm from '../LogInForm/LogInForm';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import FormMessage from '../FormMessage/FormMessage';

function LogInPage() {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

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
			const { status } = response;
			status === 200 && handleSuccess();
		} catch (err) {
			const { data } = err.response;
			typeof data === 'string'
				? setErrors([{ msg: data }])
				: setErrors([...data]);
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
			default:
				console.log('None of the form ids matched.');
		}
	};

	return (
		<main className="logIn">
			<div className="content">
				<h2>Log In</h2>
				<LogInForm handleChange={handleChange} handleSubmit={handleSubmit} />
				<FormMessage errors={errors} />
			</div>
		</main>
	);
}

export default LogInPage;