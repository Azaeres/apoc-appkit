import React from 'react';
import stores from 'stores';
import withStore from 'views/shared/withStore';
import { compose, withHandlers, pure } from 'recompose';
import idx from 'idx';
import testModel from 'app/models/testModel';

const { testStore } = stores;
const { exampleSelector } = testModel;

function One({ thing, onClick, value }) {
  return (
    <div>
      <h1>Page One {thing}</h1>
      <div>{value}</div>
      <div>
        <button onClick={onClick}>Click</button>
      </div>
      <div>
        <a href="/#/two">Two</a>
      </div>
    </div>
  );
}

export default compose(
  pure,
  withStore(testStore, exampleSelector),
  withHandlers({
    onClick: props => event => {
      testStore.testOrchestrator('changed');
    }
  })
)(One);
