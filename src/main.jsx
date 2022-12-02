import './assets/css/styles.css';
import { action as destroyAction } from './pages/contact/DestroyContact';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { loader as rootLoader, action as rootAction } from './layouts/Root';
import App from './App';
import CommonError from './pages/error/CommonError';
import ShowContact, { loader as contactLoader, action as contactAction, } from './pages/contact/ShowContact';
import EditContact, { action as editContactAction } from './pages/contact/EditContact';
import ErrorPage from './pages/error/ErrorPage';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Index from './pages/contact/Index';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <CommonError />,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{
						index: true,
						element: <Index />,
					},
					{
						path: 'contacts/:id',
						element: <ShowContact />,
						loader: contactLoader,
						action: contactAction,
					},
					{
						path: 'contacts/:id/edit',
						element: <EditContact />,
						loader: contactLoader,
						action: editContactAction,
					},
					{
						path: 'contacts/:id/destroy',
						action: destroyAction,
					},
				],
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
