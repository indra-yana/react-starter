import './assets/css/styles.css';
import { action as destroyAction } from './pages/contact/DestroyContact';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import { loader as rootLoader, action as rootAction } from './layouts/Root';
import App from './App';
import CommonError from './pages/error/CommonError';
import Contact, { loader as contactLoader, action as contactAction, } from './pages/contact/Contact';
import EditContact, { action as editContactAction } from './pages/contact/EditContact';
import ErrorPage from './pages/error/ErrorPage';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Index from './pages/contact/Index';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <CommonError/>,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				index: true,
				element: <Index/>,
				errorElement: <ErrorPage/>,
			},
			{
				path: 'contacts/:id',
				element: <Contact/>,
				loader: contactLoader,
				action: contactAction,
				errorElement: <ErrorPage/>,
			},
			{
				path: 'contacts/:id/edit',
				element: <EditContact />,
				loader: contactLoader,
				action: editContactAction,
				errorElement: <ErrorPage/>,
			},
			{
				path: 'contacts/:id/destroy',
				action: destroyAction,
				errorElement: <ErrorPage/>,
			}
		]
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
