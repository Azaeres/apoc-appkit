import React from 'react';
import { testStore } from 'app/views/pages/One';
import withStore from 'views/shared/withStore';
import { hot } from 'react-hot-loader';
import { compose, pure } from 'recompose';
import Header from 'app/views/shared/Header';
import Navigation from 'app/views/shared/Navigation';

function Two({ value, context }) {
  return (
    <div>
      <Header title="iFrame" />
      <Navigation routerContext={context} />
      <div>
        <iframe
          title="Weather"
          src="https://weather-pwa-sample.firebaseapp.com/final/index.html"
          width="100%"
          height={450}
          style={{ maxWidth: 540 }}
        />
      </div>
    </div>
  );
}

export default compose(hot(module), withStore(testStore), pure)(Two);
