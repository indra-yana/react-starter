import { action as destroyAction } from 'src/views/pages/contact/DestroyContact';
import { createBrowserRouter } from 'react-router-dom';
import { link } from './navlinks';
import About from 'src/views/pages/dashboard/about/About';
import App from 'src/App';
import AuthLayout from 'src/views/layouts/AuthLayout';
import CommonError from 'src/views/pages/error/CommonError';
import Confirm from 'src/views/pages/auth/password/Confirm';
import CreateRole from 'src/views/pages/dashboard/user/role/CreateRole';
import CreateUser from 'src/views/pages/dashboard/user/manage/CreateUser';
import Dashboard from 'src/views/pages/dashboard/index/Dashboard';
import DashboardLayout from 'src/views/layouts/DashboardLayout';
import EditContact, { action as editContactAction } from 'src/views/pages/contact/EditContact';
import EditRole from 'src/views/pages/dashboard/user/role/EditRole';
import EditUser from 'src/views/pages/dashboard/user/manage/EditUser';
import ErrorPage from 'src/views/pages/error/ErrorPage';
import Forgot from 'src/views/pages/auth/password/Forgot';
import Help from 'src/views/pages/help/Help';
import HomeLayout from 'src/views/layouts/HomeLayout';
import Index from 'src/views/pages/contact/Index';
import Landing from 'src/views/pages/landing/Landing';
import Login from 'src/views/pages/auth/Login';
import ManageRole from 'src/views/pages/dashboard/user/role/ManageRole';
import ManageUser from 'src/views/pages/dashboard/user/manage/ManageUser';
import Register from 'src/views/pages/auth/Register';
import Reset from 'src/views/pages/auth/password/Reset';
import Root, { loader as rootLoader, action as rootAction } from 'src/views/layouts/Root';
import ShowContact, { loader as contactLoader, action as contactAction } from 'src/views/pages/contact/ShowContact';
import Verify from 'src/views/pages/auth/Verify';
import Setting from 'src/views/pages/dashboard/setting/Setting';

const router = createBrowserRouter([
    {
        element: <App/>,
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
                                path: link.getPath('setting'),
                                element: <Setting />,
                                handle: {
                                    routeName: link.getName('setting'),
                                },
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

export default router;
