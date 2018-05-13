import React from 'react';
import stores from 'stores';
import withStore from 'views/shared/withStore';

const { testStore } = stores;

function Two({ value }) {
  return (
    <div>
      <h1>Page Two</h1>
      <div>{value}</div>
      <a href="/#/one">One</a>
    </div>
  );
}

export default withStore(testStore)(Two);
