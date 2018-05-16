import React from 'react';
import 'views/pages/App.css';
import { hot } from 'react-hot-loader';

function App({ children }) {
  return <div className="App">{children}</div>;
}

export default hot(module)(App);
