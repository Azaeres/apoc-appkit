import React from 'react';
import { hot } from 'react-hot-loader';
import logo from 'logo.svg';
import 'App.css';
import { withState } from 'recompose';

const enhance = withState('counter', 'setCounter', 0)

const App = enhance(({ page, counter, setCounter }) => {
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
        Count: {counter}
        <button onClick={() => setCounter(n => n + 1)}>Increment</button>
        <button onClick={() => setCounter(n => n - 1)}>Decrement</button>
      </div>
      <div>
        {page}
      </div>
    </div>
  );
});

export default hot(module)(App);
