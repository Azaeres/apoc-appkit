import React from 'react';
import logo from 'assets/logo.svg';

export default function Header({ title }) {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <h1>{title}</h1>
      <p className="App-intro">
        To get started, edit <code>src/views/App.js</code> and save to reload.
      </p>
    </div>
  );
}
