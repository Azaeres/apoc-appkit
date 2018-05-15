import React from 'react';
import withStore from 'views/shared/withStore';
import { compose, withHandlers, pure } from 'recompose';
import testModel from 'app/models/testModel';
import {
  stateMachine as objectStateMachine,
  toggleSelector,
  counterSelector
} from 'app/models/ObjectExample';
import Store from 'models/Store';
import { hot } from 'react-hot-loader';

const { stateMachine, exampleSelector } = testModel;
export const testStore = Store(stateMachine);
export const objectStore = Store(objectStateMachine);

/*

The store pipeline:

1. VIEW view control -> view event
2. VIEW view event -> dispatcher
3. MODEL dispatcher -> reducer
4. MODEL reducer -> value
5. VIEW value -> view render
6. VIEW view render

 */

function One({
  onClick,
  value,
  objectStore: { toggleValue, counterValue },
  toggle,
  incrementCounter
}) {
  console.log('> One render : objectStore', objectStore);
  console.log('> asdf');
  return (
    <div>
      <h1>Page One</h1>
      <div>
        {value} <button onClick={onClick}>Click</button>
      </div>
      <div>
        {toggleValue.toString()} <button onClick={toggle}>Toggle</button>
      </div>
      <div>
        {/* 6. view render */}
        {counterValue}
        {/* 1. view control -> view event */}
        <button onClick={incrementCounter}>Bump</button>
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
  hot(module),
  withStore(testStore, exampleSelector),
  withStore(
    objectStore,
    value => {
      return {
        toggleValue: toggleSelector(value),
        // 5. value -> view render
        counterValue: counterSelector(value)
      };
    },
    'objectStore'
  ),
  withHandlers({
    onClick: props => event => {
      testStore.dispatchTest('changed');
    },
    toggle: props => event => {
      objectStore.toggle();
    },
    incrementCounter: props => event => {
      // 2. view event -> dispatcher
      objectStore.incrementCounter();
    }
  }),
  pure
)(One);
