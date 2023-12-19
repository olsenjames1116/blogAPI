import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SignUpForm from '../SignUpForm/SignUpForm';
import FormMessage from '../FormMessage/FormMessage';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../redux/state/isLoggedInSlice';

function SignUpPage() {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [status, setStatus] = useState();

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.isLoggedIn.value);

	useEffect(() => {
		document.title = 'Sign Up';

		const fetchStatus = async () => {
			try {
				await axios.get('http://localhost:4000/api/user/sign-up');
				console.log(isLoggedIn);
			} catch (err) {
				const { status } = err.response;
				if (status === 403) {
					dispatch(logIn());
					navigate('/');
				} else {
					console.log(err);
				}
			}
		};

		fetchStatus();
	});

	const clearForm = () => {
		const formInputs = document.querySelectorAll('form input');
		formInputs.forEach((input) => {
			input.value = '';
		});
	};

	const handleSuccess = (errors) => {
		clearForm();
		setErrors(errors);
		setTimeout(() => navigate('/log-in'), 3000);
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
			status === 201 && handleSuccess(errors);
			setStatus(status);
		} catch (err) {
			const { status } = err.response;
			if (status === 400) {
				const { errors } = err.response.data;
				typeof errors === 'string'
					? setErrors([{ msg: errors }])
					: setErrors([...errors]);
			} else {
				const { data } = err.response;
				typeof data === 'string'
					? setErrors([{ msg: data }])
					: setErrors([...data]);
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
