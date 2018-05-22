import React from 'react';
import { testStore } from 'views/pages/One';
import withStore from 'views/shared/withStore';
import { hot } from 'react-hot-loader';
import { compose, pure } from 'recompose';
import Header from 'views/shared/Header';
import Navigation from 'views/shared/Navigation';

function Two({ value, context }) {
  return (
    <div>
      <Header title="Page Two" />
      <Navigation routerContext={context} />
      <div>{value}</div>
    </div>
  );
}

export default compose(hot(module), withStore(testStore), pure)(Two);
