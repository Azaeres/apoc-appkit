import React from 'react';
import withStore from 'views/shared/withStore';
import { compose, withHandlers, pure } from 'recompose';
import testModel from 'app/models/testModel';
import {
  stateMachine as objectStateMachine,
  toggleSelector,
  counterSelector
} from 'app/models/ObjectExample';
import Store, { Accessors } from 'models/Store';
import { hot } from 'react-hot-loader';
import Header from 'views/shared/Header';

const { stateMachine, exampleSelector } = testModel;
export const testStore = Store(stateMachine);

const storeId = '2774306e-d494-cfb0-0d2b-df98d5650d79';

// const cache = {
//   [storeId]: ObjectExample(10, false)
// };
const initialize = async storeId => {
  const got = JSON.parse(localStorage.getItem(storeId));
  // console.log('> : got', got);
  const initial = got === null ? undefined : got;
  // console.log('> : initial', initial);
  return Promise.resolve(initial);
};
const getter = async storeId => {
  // console.log('> get : ', storeId);
  // const value = cache[storeId];
  const value = localStorage.getItem(storeId);
  return Promise.resolve(JSON.parse(value));
};
const setter = async (storeId, value) => {
  // console.log('> set : storeId', storeId);
  // console.log('> : value', value);
  // cache[storeId] = value;
  localStorage.setItem(storeId, JSON.stringify(value));
  return Promise.resolve();
};

export const objectStore = Store(
  objectStateMachine,
  Accessors(initialize, getter, setter),
  storeId
);
// console.log('> : cache', cache);
// console.log('> : JSON.stringify(cache)', JSON.stringify(cache));
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
  secondInstanceOfCounter,
  toggle,
  incrementCounter
}) {
  return (
    <div>
      <Header title="Page One" />
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
        {secondInstanceOfCounter}
      </div>
      <div>
        <a href="/#/two">Two</a>
      </div>
      <div>
        <a href="/#/load/foo">Prefetch Load</a>
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
      // console.log('> selector: value', value);
      return {
        toggleValue: toggleSelector(value),
        // 5. value -> view render
        counterValue: counterSelector(value)
      };
    },
    'objectStore'
  ),
  withStore(
    objectStore,
    value => counterSelector(value),
    'secondInstanceOfCounter'
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
