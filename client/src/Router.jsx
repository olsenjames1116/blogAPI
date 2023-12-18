import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';

function Router() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Home />,
		},
		{
			path: 'sign-up',
			element: <SignUp />,
		},
	]);

	return <RouterProvider router={router} />;
}

export default Router;
