import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import SignUpPage from './components/SignUpPage/SignUpPage';

function Router() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <HomePage />,
		},
		{
			path: 'sign-up',
			element: <SignUpPage />,
		},
	]);

	return <RouterProvider router={router} />;
}

export default Router;
