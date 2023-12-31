import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Router from './Router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from './redux/state/isLoggedInSlice';
import { makeAdmin } from './redux/state/isAdminSlice';
import './App.css';

function App() {
	const dispatch = useDispatch();

	// If the user reloads the page, they stay logged in with their admin info.
	useEffect(() => {
		const isLoggedIn = localStorage.getItem('isLoggedIn');
		const isAdmin = localStorage.getItem('isAdmin');

		isLoggedIn && dispatch(logIn());
		isAdmin && dispatch(makeAdmin());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Header />
			<Router />
			<Footer />
		</>
	);
}

export default App;
