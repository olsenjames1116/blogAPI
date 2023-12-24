import React from 'react';
import LogInForm from '../LogInForm/LogInForm';
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../../axiosConfig';
import FormMessage from '../FormMessage/FormMessage';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../redux/state/isLoggedInSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { makeAdmin } from '../../redux/state/isAdminSlice';
import Cookies from 'universal-cookie';

function LogInPage() {
	const [message, setMessage] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const isLoggedIn = useSelector((state) => state.isLoggedIn.value);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cookies = new Cookies();

	useEffect(() => {
		document.title = 'Log In';
	});

	const handleSuccess = (isAdmin, accessToken, refreshToken, username) => {
		if (isAdmin) {
			dispatch(makeAdmin());
			localStorage.setItem('isAdmin', true);
		}
		cookies.set('accessToken', accessToken);
		cookies.set('refreshToken', refreshToken);
		cookies.set('username', username);
		dispatch(logIn());
		localStorage.setItem('isLoggedIn', true);
		navigate('/');
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await api.post('/user/log-in', {
				username: username,
				password: password,
			});
			const { isAdmin, accessToken, refreshToken } = response.data;
			handleSuccess(isAdmin, accessToken, refreshToken, username);
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
