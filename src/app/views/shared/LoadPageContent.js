import React from 'react';
import { testStore } from 'app/views/pages/One';
import withStore from 'views/shared/withStore';
import { hot } from 'react-hot-loader';
import { compose, pure } from 'recompose';

function LoadPageContent({ query: { thing }, value }) {
  return (
    <div>
      <div>Thing: {thing}</div>
      <div>Value: {value}</div>
    </div>
  );
}

export default compose(hot(module), withStore(testStore), pure)(
  LoadPageContent
);
