import React from 'react';
import { testStore } from 'views/pages/One';
import withStore from 'views/shared/withStore';
import { hot } from 'react-hot-loader';
import { compose, pure } from 'recompose';

function Load(props) {
  console.log('> Load : props', props);
  const { query: { thing }, value } = props;
  return (
    <div>
      <h1>Loadable Page</h1>
      <div>Thing: {thing}</div>
      <div>Value: {value}</div>
      <div>
        <a href="/#/one">One</a>
      </div>
      <div>
        <a href="/#/two">Two</a>
      </div>
    </div>
  );
}

export default compose(hot(module), withStore(testStore), pure)(Load);
