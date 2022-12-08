import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/css/styles.css';
import { action as destroyAction } from './pages/contact/DestroyContact';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import App from './App';
import CommonError from './pages/error/CommonError';
import EditContact, { action as editContactAction } from './pages/contact/EditContact';
import ErrorPage from './pages/error/ErrorPage';
import Index from './pages/contact/Index';
import Landing from './pages/landing/Landing';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Root, { loader as rootLoader, action as rootAction } from './layouts/Root';
import ShowContact, { loader as contactLoader, action as contactAction, } from './pages/contact/ShowContact';
import HomeLayout from './layouts/HomeLayout';
import Help from './pages/help/Help';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Forgot from './pages/auth/password/Forgot';
import Reset from './pages/auth/password/Reset';
import Confirm from './pages/auth/password/Confirm';
import Verify from './pages/auth/Verify';

const router = createBrowserRouter([
	{
		element: <App />,
		errorElement: <CommonError />,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				path: '/',
				element: <HomeLayout />,
				children: [
					{
						index:true,
						element: <Landing/>,
					},
					{
						path:'help',
						element: <Help/>,
					},
				]
			},
			{
				path: 'auth',
				element: <AuthLayout />,
				children: [
					{
						path:'login',
						element: <Login/>,
					},
					{
						path:'register',
						element: <Register/>,
					},
					{
						path:'forgot',
						element: <Forgot/>,
					},
					{
						path:'reset/:token',
						element: <Reset/>,
					},
					{
						path:'confirm',
						element: <Confirm/>,
					},
					{
						path:'verify/:token',
						element: <Verify/>,
					},
				]
			},
			{
				path: 'contacts',
				element: <Root />,
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
