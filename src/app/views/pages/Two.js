import React from 'react';
import { testStore } from 'views/pages/One';
import withStore from 'views/shared/withStore';

function Two({ value }) {
  return (
    <div>
      <h1>Page Two</h1>
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

export default withStore(testStore)(Two);
