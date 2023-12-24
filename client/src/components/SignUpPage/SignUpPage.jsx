import React, { useEffect, useState } from 'react';
import api from '../../axiosConfig';
import SignUpForm from '../SignUpForm/SignUpForm';
import FormMessage from '../FormMessage/FormMessage';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SignUpPage() {
	const [message, setMessage] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [status, setStatus] = useState();

	const isLoggedIn = useSelector((state) => state.isLoggedIn.value);

	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Sign Up';
	});

	const clearForm = () => {
		const formInputs = document.querySelectorAll('form input');
		formInputs.forEach((input) => {
			input.value = '';
		});
	};

	const handleSuccess = (message) => {
		clearForm();
		setMessage(message);
		setTimeout(() => navigate('/log-in'), 3000);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await api.post('/user/sign-up', {
				username: username,
				password: password,
				confirmPassword: confirmPassword,
			});
			const { message } = response.data;
			const { status } = response;
			handleSuccess(message);
			setStatus(status);
		} catch (err) {
			const { status } = err.response;
			if (status === 400) {
				const { message } = err.response.data;
				setMessage(message);
			} else {
				console.log(err);
			}
		}
	};

	const handleChange = (event) => {
		const { id, value } = event.target;

		switch (id) {
			case 'username':
				setUsername(value);
				break;
			case 'password':
				setPassword(value);
				break;
			case 'confirmPassword':
				setConfirmPassword(value);
				break;
			default:
				console.log('None of the form ids matched.');
		}
	};

	return (
		<main className="signUp">
			{isLoggedIn && <Navigate to="/" replace />}
			<div className="content">
				<h2>Sign Up</h2>
				<SignUpForm handleChange={handleChange} handleSubmit={handleSubmit} />
				<FormMessage message={message} status={status} />
			</div>
		</main>
	);
}

export default SignUpPage;
