import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/state/isLoggedInSlice';
import api from '../../axiosConfig';
import { removeAdmin } from '../../redux/state/isAdminSlice';
import Cookies from 'universal-cookie';
import { adminImage, logOutImage } from '../../assets/images';
import styles from './Links.module.css';

// Represents the links in the nav at the top of the page.
function Links() {
	const isLoggedIn = useSelector((state) => state.isLoggedIn.value);
	const isAdmin = useSelector((state) => state.isAdmin.value);

	const dispatch = useDispatch();

	const cookies = new Cookies();

	// Logs the user out by changing the state and removing information from memory.
	const logOutUser = async () => {
		try {
			await api.get('/user/log-out');
		} catch (err) {
			console.log(err);
		}

		localStorage.removeItem('isLoggedIn');
		localStorage.removeItem('isAdmin');
		cookies.remove('accessToken');
		cookies.remove('refreshToken');
		cookies.remove('username');
		dispatch(logOut());
		dispatch(removeAdmin());
	};

	return (
		<ul className={styles.links}>
			{!isLoggedIn && (
				<li>
					<Link to="/log-in">Log In</Link>
				</li>
			)}
			{!isLoggedIn && (
				<li>
					<Link to="/sign-up">Sign Up</Link>
				</li>
			)}
			{isAdmin && (
				<li className={styles.admin}>
					<Link to="/admin-dashboard">
						<img src={adminImage} alt="link to admin page" />
					</Link>
				</li>
			)}
			{isLoggedIn && (
				<li className={styles.logOut}>
					<Link to="/" onClick={logOutUser}>
						<img src={logOutImage} alt="link to log user out" />
					</Link>
				</li>
			)}
		</ul>
	);
}

export default Links;
