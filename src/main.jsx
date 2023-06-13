import './assets/css/styles.css';
import '@fortawesome/fontawesome-free';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'src/lang/i18n';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import router from './router';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
			<RouterProvider router={router} />
		</GoogleOAuthProvider>
	</React.StrictMode>
)
