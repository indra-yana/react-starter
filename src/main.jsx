import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './assets/css/styles.css';
import 'src/lang/i18n';
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import router from './router';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
)
