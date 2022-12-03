import './assets/css/styles.css';
import { action as destroyAction } from './pages/contact/DestroyContact';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Root, { loader as rootLoader, action as rootAction } from './layouts/Root';
import App from './App';
import CommonError from './pages/error/CommonError';
import ShowContact, { loader as contactLoader, action as contactAction, } from './pages/contact/ShowContact';
import EditContact, { action as editContactAction } from './pages/contact/EditContact';
import ErrorPage from './pages/error/ErrorPage';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Index from './pages/contact/Index';
import Landing from './pages/landing/Landing';

const router = createBrowserRouter([
	{
		element: <App />,
		errorElement: <CommonError />,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				path: '/',
				element: <Landing />,
				index: true,
			},
			{
				path: 'contacts',
				element: <Root/>,
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
								path: ':id',
								element: <ShowContact />,
								loader: contactLoader,
								action: contactAction,
							},
							{
								path: ':id/edit',
								element: <EditContact />,
								loader: contactLoader,
								action: editContactAction,
							},
							{
								path: ':id/destroy',
								action: destroyAction,
							},
						],
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
