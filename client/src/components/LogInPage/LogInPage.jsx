import React from 'react';
import LogInForm from '../LogInForm/LogInForm';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import FormMessage from '../FormMessage/FormMessage';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/state/isLoggedInSlice';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function LogInPage() {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cookies = new Cookies();

	useEffect(() => {
		document.title = 'Log In';

		const fetchStatus = async () => {
			try {
				await axios.get('http://localhost:4000/api/user/log-in', {
					headers: { Authorization: `Bearer ${cookies.get('accessToken')}` },
				});
			} catch (err) {
				const { status } = err.response;
				if (status === 401 || status === 403) {
					dispatch(logIn());
					navigate('/');
				} else {
					console.log(err);
				}
			}
		};

		fetchStatus();
	}, []);

	const handleSuccess = () => {
		dispatch(logIn());
		navigate('/');
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
			const { accessToken } = response.data;
			cookies.set('accessToken', accessToken, {
				maxAge: 86400,
			});
			console.log(cookies.get('accessToken'));
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
