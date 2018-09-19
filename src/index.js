import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import registerServiceWorker from 'registerServiceWorker';
import UniversalRouter from 'universal-router';

// TODO: This file location is the responsibility of the app
// Create an `app/app.json` to keep a map of locations for:
// App.js, routes.js, stores.js, etc.
import App from 'app/views/pages/App';

// TODO: This file location is the responsibility of the app
// Create an `app/app.json` to keep a map of locations for:
// App.js, routes.js, stores.js, etc.
import routes from 'app/routes';

const { REACT_APP_PUBLIC_URL } = process.env;

const router = new UniversalRouter(routes, {
  baseUrl: `${REACT_APP_PUBLIC_URL}/#`
});

registerServiceWorker();
window.addEventListener('hashchange', handleNewHash, false);
handleNewHash();

async function handleNewHash() {
  const newHash = window.location.hash.substr(1);
  const Page = await router.resolve({
    pathname: `${REACT_APP_PUBLIC_URL}/#${newHash}`
  });
  ReactDOM.render(<App>{Page}</App>, document.getElementById('root'));
}
