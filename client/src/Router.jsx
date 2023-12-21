import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import LogInPage from './components/LogInPage/LogInPage';
import AdminPage from './components/AdminPage/AdminPage';
import EditPostPage from './components/EditPostPage/EditPostPage';

function Router() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/sign-up" element={<SignUpPage />} />
			<Route path="/log-in" element={<LogInPage />} />
			<Route path="/admin-dashboard" element={<AdminPage />} />
			<Route path="/edit-post" element={<EditPostPage />} />
		</Routes>
	);
}

export default Router;
