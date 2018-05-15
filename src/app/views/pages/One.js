import React from 'react';
import withStore from 'views/shared/withStore';
import { compose, withHandlers, pure } from 'recompose';
import testModel from 'app/models/testModel';
import Store from 'models/Store';

const { stateMachine, exampleSelector } = testModel;
const testStore = Store(stateMachine);

export { testStore };

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
      <div>
        <a href="/#/load">Load</a>
      </div>
    </div>
  );
}

export default compose(
  pure,
  withStore(testStore, exampleSelector),
  withHandlers({
    onClick: props => event => {
      testStore.dispatchTest('changed');
    }
  })
)(One);
