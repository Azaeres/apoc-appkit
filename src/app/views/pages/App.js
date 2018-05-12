import React from 'react';
import logo from 'assets/logo.svg';
import 'views/pages/App.css';
import { withState } from 'recompose';

const enhance = withState('counter', 'setCounter', 0)

const App = enhance(({ children, counter, setCounter }) => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/views/App.js</code> and save to reload.
      </p>
      <div>
        Count: {counter}
        <button onClick={() => setCounter(n => n + 1)}>Increment</button>
        <button onClick={() => setCounter(n => n - 1)}>Decrement</button>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
});

export default App;
