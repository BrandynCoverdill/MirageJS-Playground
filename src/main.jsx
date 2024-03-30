import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import { makeServer } from './server/server.js';
import 'normalize.css';
import './styles/index.css';

/**
 * Note: process.env.NODE_ENV represents our application's environment. If we are in development mode, it will be development, otherwise it will be production.
 *
 * If the current application environment is set up as development, create a mock server.
 */
if (process.env.NODE_ENV === 'development') {
	/**
	 * By passing {environment: 'development'} to this function, we now have access to run seeds in the development environment.
	 */
	makeServer({ environment: 'development' });
}

// This will make it so when on the production build, it will use mirage js as the mock db.
if (process.env.NODE_ENV === 'production') {
	makeServer({ environment: 'production' });
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
