import React from 'react';
import 'app/views/pages/App.css';
import { hot } from 'react-hot-loader';

function App({ children }) {
  return <div className="App">{children}</div>;
}

export default hot(module)(App);
