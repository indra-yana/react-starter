import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/css/styles.css';
import 'src/lang/i18n';
import { action as destroyAction } from 'src/views/pages/contact/DestroyContact';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import App from './App';
import CommonError from 'src/views/pages/error/CommonError';
import EditContact, { action as editContactAction } from 'src/views/pages/contact/EditContact';
import ErrorPage from 'src/views/pages/error/ErrorPage';
import Index from 'src/views/pages/contact/Index';
import Landing from 'src/views/pages/landing/Landing';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Root, { loader as rootLoader, action as rootAction } from 'src/views/layouts/Root';
import ShowContact, { loader as contactLoader, action as contactAction, } from 'src/views/pages/contact/ShowContact';
import HomeLayout from 'src/views/layouts/HomeLayout';
import Help from 'src/views/pages/help/Help';
import AuthLayout from 'src/views/layouts/AuthLayout';
import Login from 'src/views/pages/auth/Login';
import Register from 'src/views/pages/auth/Register';
import Forgot from 'src/views/pages/auth/password/Forgot';
import Reset from 'src/views/pages/auth/password/Reset';
import Confirm from 'src/views/pages/auth/password/Confirm';
import Verify from 'src/views/pages/auth/Verify';
import DashboardLayout from 'src/views/layouts/DashboardLayout';
import Dashboard from 'src/views/pages/dashboard/index/Dashboard';
import ManageUser from 'src/views/pages/dashboard/user/manage/ManageUser';
import ManageRole from 'src/views/pages/dashboard/user/role/ManageRole';
import CreateUser from 'src/views/pages/dashboard/user/manage/CreateUser';
import EditUser from 'src/views/pages/dashboard/user/manage/EditUser';
import CreateRole from 'src/views/pages/dashboard/user/role/CreateRole';
import EditRole from 'src/views/pages/dashboard/user/role/EditRole';
import About from 'src/views/pages/dashboard/about/About';
import { link } from './router/links';

const router = createBrowserRouter([
	{
		element: <App />,
		errorElement: <CommonError />,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				path: link.getPath('home'),
				element: <HomeLayout />,
				children: [
					{
						index: true,
						element: <Landing />,
					},
					{
						path: link.getPath('help'),
						element: <Help />,
					},
				]
			},
			{
				element: <AuthLayout />,
				children: [
					{
						path: link.getPath('login'),
						element: <Login />,
					},
					{
						path: link.getPath('register'),
						element: <Register />,
					},
					{
						path: link.getPath('forgot'),
						element: <Forgot />,
					},
					{
						path: link.getPath('reset'),
						element: <Reset />,
					},
					{
						path: link.getPath('confirm'),
						element: <Confirm />,
					},
					{
						path: link.getPath('verify'),
						element: <Verify />,
					},
				]
			},
			{
				path: link.getPath('dashboard'),
				element: <DashboardLayout />,
				children: [
					{
						errorElement: <ErrorPage />,
						children: [
							{
								index: true,
								element: <Dashboard />,
								handle: {
									routeName: link.getName('dashboard'),
								},
							},
							{
								path: link.getPath('manage_user'),
								children: [
									{
										index: true,
										element: <ManageUser />,
										handle: {
											routeName: link.getName('manage_user'),
										},
									},
									{
										path: link.getPath('create_user'),
										element: <CreateUser />,
										handle: {
											routeName: link.getName('create_user'),
										},
									},
									{
										path: link.getPath('edit_user'),
										element: <EditUser />,
										handle: {
											routeName: link.getName('edit_user'),
										},
									},
								]
							},
							{
								path: link.getPath('manage_role'),
								children: [
									{
										index: true,
										element: <ManageRole />,
										handle: {
											routeName: link.getName('manage_role'),
										},
									},
									{
										path: link.getPath('create_role'),
										element: <CreateRole />,
										handle: {
											routeName: link.getName('create_role'),
										},
									},
									{
										path: link.getPath('edit_role'),
										element: <EditRole />,
										handle: {
											routeName: link.getName('edit_role'),
										},
									},
								]
							},
							{
								path: link.getPath('about'),
								element: <About />,
								handle: {
									routeName: link.getName('about'),
								},
							},
						]
					}
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
