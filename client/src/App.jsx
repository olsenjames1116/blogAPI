import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Router from './Router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from './redux/state/isLoggedInSlice';
import { makeAdmin } from './redux/state/isAdminSlice';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const isLoggedIn = localStorage.getItem('isLoggedIn');
		const isAdmin = localStorage.getItem('isAdmin');

		isLoggedIn && dispatch(logIn());
		isAdmin && dispatch(makeAdmin());
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
