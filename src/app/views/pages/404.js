import React from 'react';
import logo from 'assets/logo.svg';
import Navigation from 'app/views/shared/Navigation';

export default function NotFound404({ context }) {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <h1>Not Found</h1>
      <p className="App-intro">
        To get started, edit <code>src/views/App.js</code> and save to reload.
      </p>
      {/* <div>
        Count: {counter}
        <button onClick={() => setCounter(n => n + 1)}>Increment</button>
        <button onClick={() => setCounter(n => n - 1)}>Decrement</button>
      </div> */}
      <Navigation routerContext={context} />
    </div>
  );
}
