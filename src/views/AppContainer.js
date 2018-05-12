import React from 'react';
import { hot } from 'react-hot-loader';

// TODO: This file location is the responsibility of the app
// Create an `app/app.json` to keep a map of locations for:
// App.js, routes.js, stores.js, etc.
import App from 'app/views/pages/App';

function AppContainer({ children, ...restOfProps }) {
  return (
    <div className="AppContainer">
      <App {...restOfProps}>
        {children}
      </App>
    </div>
  );
};

export default hot(module)(AppContainer);
