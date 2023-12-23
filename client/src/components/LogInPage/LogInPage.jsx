import React from 'react';
import LogInForm from '../LogInForm/LogInForm';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import FormMessage from '../FormMessage/FormMessage';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../redux/state/isLoggedInSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { makeAdmin } from '../../redux/state/isAdminSlice';

function LogInPage() {
	const [message, setMessage] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const isLoggedIn = useSelector((state) => state.isLoggedIn.value);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Log In';
	});

	const handleSuccess = (isAdmin) => {
		if (isAdmin) {
			dispatch(makeAdmin());
			localStorage.setItem('isAdmin', true);
		}
		dispatch(logIn());
		localStorage.setItem('isLoggedIn', true);
		navigate('/');
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios({
				method: 'post',
				url: 'http://localhost:4000/api/user/log-in',
				data: {
					username: username,
					password: password,
				},
			});
			const { isAdmin } = response.data;
			handleSuccess(isAdmin);
		} catch (err) {
			const { status } = err.response;
			if (status === 401) {
				const { data } = err.response;
				setMessage([{ msg: data }]);
			} else {
				console.log(err);
			}
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
			{isLoggedIn && <Navigate to="/" replace />}
			<div className="content">
				<h2>Log In</h2>
				<LogInForm handleChange={handleChange} handleSubmit={handleSubmit} />
				<FormMessage message={message} />
			</div>
		</main>
	);
}

export default LogInPage;
