import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
import SignUpPage from './components/SignUpPage/SignUpPage';

function Router() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Home />,
		},
		{
			path: 'sign-up',
			element: <SignUpPage />,
		},
	]);

	return <RouterProvider router={router} />;
}

export default Router;
