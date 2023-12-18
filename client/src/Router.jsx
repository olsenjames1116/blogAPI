import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';

function Router() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Home />,
		},
	]);

	return <RouterProvider router={router} />;
}

export default Router;
