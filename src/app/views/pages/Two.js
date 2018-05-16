import React from 'react';
import { testStore } from 'views/pages/One';
import withStore from 'views/shared/withStore';
import { hot } from 'react-hot-loader';
import { compose, pure } from 'recompose';
import Header from 'views/shared/Header';

function Two({ value }) {
  return (
    <div>
      <Header title="Page Two" />
      <div>{value}</div>
      <div>
        <a href="/#/one">One</a>
      </div>
      <div>
        <a href="/#/load">Load</a>
      </div>
    </div>
  );
}

export default compose(hot(module), withStore(testStore), pure)(Two);
