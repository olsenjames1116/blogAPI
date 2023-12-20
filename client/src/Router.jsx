import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import LogInPage from './components/LogInPage/LogInPage';
import AdminPage from './components/AdminPage/AdminPage';

function Router() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/sign-up" element={<SignUpPage />} />
			<Route path="/log-in" element={<LogInPage />} />
			<Route path="/admin-page" element={<AdminPage />} />
		</Routes>
	);
}

export default Router;
