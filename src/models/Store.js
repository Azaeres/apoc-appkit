import guid from 'util/guid';

const storeInstances = {};

export default function Store(stateMachine) {
  const { initialValue, reducer, dispatchers } = stateMachine;
  const name = guid();
  storeInstances[name] = { value: initialValue, reducer, subscribers: [] };
  return Interface(name, dispatchers);
}

export function StateMachine(initialValue, reducer, dispatchers) {
  return { initialValue, reducer, dispatchers };
}

function Interface(name, dispatchers) {
  const dispatch = action => {
    setTimeout(() => {
      const { value, reducer } = storeInstances[name];
      // console.log('> calling reducer : value, action', value, action);
      // console.log('> : reducer', reducer);
      const nextValue = reducer(value, action);
      // console.log('> dispatch : nextValue', nextValue);
      swap(name, nextValue);
    }, 0);
  };
  const keys = Object.keys(dispatchers);
  const _dispatchers = keys.reduce((acc, methodName) => {
    const customMethod = dispatchers[methodName];
    return { ...acc, [methodName]: customMethod(dispatch) };
  }, {});
  return {
    dispatch,
    getValue: () => {
      return storeInstances[name].value;
    },
    subscribe: listener => {
      const { subscribers } = storeInstances[name];
      subscribers.push(listener);
    },
    unsubscribe: listener => {
      const { subscribers } = storeInstances[name];
      const index = subscribers.indexOf(listener);
      if (index !== -1) {
        subscribers.splice(index, 1);
      }
    },
    ..._dispatchers
  };
}

function swap(name, value) {
  const storeInstance = storeInstances[name];
  const previousValue = storeInstance.value;
  storeInstance.value = value;
  notifySubscribers(name, previousValue, storeInstance.value);
}

function notifySubscribers(name, previousValue, currentValue) {
  const { subscribers } = storeInstances[name];
  subscribers.forEach((subscriber, i) => {
    subscriber(currentValue, previousValue);
  });
}

// (function test() {
//   const { testStore } = stores;
//   const value = testStore.getValue();
//   console.log('> test: value', value);
//   testStore.dispatchTest('foo');
//   const value2 = testStore.getValue();
//   console.log('> : value2', value2);
// })();
//
// (function test2() {
//   const { testStore } = stores;
//   const listener = value => {
//     console.log('> subscriber was notified of: value', value);
//   };
//   testStore.subscribe(listener);
//   const value = testStore.getValue();
//   console.log('# subscribed!: value', value);
//   testStore.dispatchTest('bar');
//   const value2 = testStore.getValue();
//   console.log('> : value2', value2);
//   testStore.unsubscribe(listener);
//   console.log('# unsubscribed!');
//   testStore.dispatchTest('silent');
//   const value3 = testStore.getValue();
//   console.log('> : value3', value3);
// })();
