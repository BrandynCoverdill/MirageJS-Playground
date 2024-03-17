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

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
