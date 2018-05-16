import React from 'react';
import logo from 'assets/logo.svg';

export default function NotFound404() {
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
      <div>
        <a href="/#/one">One</a>
      </div>
      <div>
        <a href="/#/two">Two</a>
      </div>
      <div>
        <a href="/#/load">Load</a>
      </div>
    </div>
  );
}
