const storeInstances = {};

export default function Store(name, stateMachine) {
  const { initialValue, reducer, orchestrators } = stateMachine;
  storeInstances[name] = { value: initialValue, reducer, subscribers: [] };
  return {
    [name]: Interface(name, orchestrators)
  };
}

export function StateMachine(initialValue, reducer, orchestrators) {
  return { initialValue, reducer, orchestrators };
}

function Interface(name, orchestrators) {
  const dispatch = action => {
    const { value, reducer } = storeInstances[name];
    const nextValue = reducer(value, action);
    console.log('> : nextValue', nextValue);
    swap(name, nextValue);
  };
  const keys = Object.keys(orchestrators);
  const _orchestrators = keys.reduce((acc, methodName) => {
    const customMethod = orchestrators[methodName];
    return { ...acc, [methodName]: customMethod(dispatch) };
  }, {});
  return {
    dispatch,
    getValue: () => {
      return storeInstances[name].value;
    },
    subscribe: listener => {
      storeInstances[name].subscribers.push(listener);
    },
    unsubscribe: listener => {
      const { subscribers } = storeInstances[name];
      const index = subscribers.indexOf(listener);
      if (index !== -1) {
        subscribers.splice(index, 1);
      }
    },
    ..._orchestrators
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
//   testStore.testOrchestrator('foo');
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
//   testStore.testOrchestrator('bar');
//   const value2 = testStore.getValue();
//   console.log('> : value2', value2);
//   testStore.unsubscribe(listener);
//   console.log('# unsubscribed!');
//   testStore.testOrchestrator('silent');
//   const value3 = testStore.getValue();
//   console.log('> : value3', value3);
// })();
