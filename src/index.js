import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import UniversalRouter from 'universal-router';
import routes from 'routes.js';

const router = new UniversalRouter(routes);

registerServiceWorker();
window.addEventListener('hashchange', handleNewHash, false);
handleNewHash();

function handleNewHash() {
  const newHash = window.location.hash.substr(1);
  router.resolve({ pathname: newHash })
    .then(page => {
      console.log("> render : page", page);
      ReactDOM.render(<App page={page} />, document.getElementById('root'));
    });
}

function delay(ms) {
  return new Promise((resolve) => {
    return setTimeout(resolve, ms);
  });
}
