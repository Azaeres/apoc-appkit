import React from 'react';
import { hot } from 'react-hot-loader';
import logo from 'logo.svg';
import 'App.css';
import Loadable from 'react-loadable';

const LoadableBar = Loadable({
  loader: () => {
    return delay(2000)
      .then(() => {
        return import('Bar.js');
      });
  },
  loading() {
    return <div>Loading...</div>
  },
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <div>
        <LoadableBar text="fdfsdf"  />
      </div>
    </div>
  );
}

export default hot(module)(App);

function delay(ms) {
  return new Promise((resolve) => {
    return setTimeout(resolve, ms);
  });
}
