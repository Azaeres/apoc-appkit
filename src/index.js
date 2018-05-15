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
import routes from 'routes';

const router = new UniversalRouter(routes);

registerServiceWorker();
window.addEventListener('hashchange', handleNewHash, false);
handleNewHash();

async function handleNewHash() {
  const newHash = window.location.hash.substr(1);
  const Page = await router.resolve({ pathname: newHash });
  ReactDOM.render(<App>{Page}</App>, document.getElementById('root'));
}
