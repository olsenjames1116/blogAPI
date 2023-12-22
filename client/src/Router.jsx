import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import LogInPage from './components/LogInPage/LogInPage';
import AdminPage from './components/AdminPage/AdminPage';
import EditPostPage from './components/EditPostPage/EditPostPage';
import PostDetailPage from './components/PostDetailPage/PostDetailPage';

function Router() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/sign-up" element={<SignUpPage />} />
			<Route path="/log-in" element={<LogInPage />} />
			<Route path="/admin-dashboard" element={<AdminPage />} />
			<Route path="/edit-post" element={<EditPostPage />} />
			<Route path="/edit-post/:id" element={<EditPostPage />} />
			<Route path="/post/:id" element={<PostDetailPage />} />
		</Routes>
	);
}

export default Router;
