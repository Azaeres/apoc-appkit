import guid from 'util/guid';
// import delay from 'util/delay';

const storeInstances = {};
const bestGuessCache = {};

const defaultInitialize = async (storeId, initialValue) => {
  storeInstances[storeId].value = initialValue;
  // console.log(
  //   '> defaultInitialize: storeInstances[storeId]',
  //   storeInstances[storeId],
  //   storeId
  // );
  return Promise.resolve(initialValue);
};
const defaultGetter = async storeId => {
  const { value } = storeInstances[storeId];
  // console.log('> defaultGetter : ', storeId);
  // console.log('> : storeInstances[storeId]', storeInstances[storeId]);
  // console.log('> : value', value);
  return Promise.resolve(value);
};
const defaultSetter = (storeId, value) => {
  storeInstances[storeId].value = value;
  return Promise.resolve();
};

export default function Store(stateMachine, accessors = Driver(), storeId) {
  const { initialValue, reducer, dispatchers } = stateMachine;
  const { getter, setter, initialize } = accessors;
  storeId = storeId === undefined ? guid() : storeId;
  // console.log('> Store() : storeId', storeId);
  // console.log('> Store : initialValue, storeId', initialValue, storeId);
  bestGuessCache[storeId] = { value: initialValue, prefer: 0 };
  storeInstances[storeId] = { reducer, subscribers: [] };
  initialize(storeId, initialValue).then(async init => {
    // console.log('### intialize Store: storeId', storeId);
    // console.log('> Store: init', init, storeId);
    const value = init === undefined ? initialValue : init;
    // console.log('> : value', value, storeId);
    const currentValue = await getter(storeId);
    // console.log('> : currentValue', currentValue, storeId);
    Object.assign(bestGuessCache[storeId], { value: currentValue });
    // console.log('> setting... : value, storeId', value, storeId);
    return await setter(storeId, value);
  });
  return Interface(storeId, dispatchers, accessors);
}

export function Driver(
  initialize = defaultInitialize,
  getter = defaultGetter,
  setter = defaultSetter
) {
  return {
    initialize,
    getter,
    setter
  };
}

export function StateMachine(initialValue, reducer, dispatchers) {
  return { initialValue, reducer, dispatchers };
}

function Interface(storeId, dispatchers, accessors) {
  // console.log(
  //   '> Interface : storeId, dispatchers, accessors',
  //   storeId,
  //   dispatchers,
  //   accessors
  // );
  const { getter } = accessors;
  const dispatch = async action => {
    // console.log('##### dispatch : action', action, storeId);
    // console.log(
    //   '> : storeInstances[storeId]',
    //   storeInstances[storeId],
    //   storeId
    // );
    const { reducer } = storeInstances[storeId];

    // Local async, should be relatively quick
    const currentActualValue = await getter(storeId);
    // console.log('> : currentActualValue', currentActualValue, storeId);
    // console.log('> : bestGuessCache[storeId]', bestGuessCache[storeId]);
    const previousValue = bestGuessCache[storeId].prefer
      ? bestGuessCache[storeId].value
      : currentActualValue;
    // console.log('> local async get : previousValue', previousValue);
    // Syncronous, optimistic update
    const prediction = reducer(previousValue, action);
    // console.log('> Syncronous, optimistic update : prediction', prediction);
    cacheSwap(storeId, prediction);
    // Simulate delay with sending action, like over a network
    // console.log('#### Simulating network delay...');
    // await delay(3000);
    // This is the actual determination of the next value.
    const nextValue = reducer(previousValue, action);
    // Local async, should be relatively quick
    await swap(storeId, nextValue, accessors);
    return { nextValue, previousValue };
  };
  const _interface = {
    // The only way to change the value of a store over time.
    dispatch,
    // Syncronous and fast, but might differ from the actual value.
    get value() {
      // console.log('> get value : bestGuessCache', bestGuessCache);
      return bestGuessCache[storeId].value;
    },
    // Gets you the actual value, but is asyncronous.
    async getValue() {
      return getter(storeId);
    },
    // Attaches a listener function that will be called to receive updates on state changes.
    subscribe: listener => {
      const { subscribers } = storeInstances[storeId];
      subscribers.push(listener);
    },
    // Detaches the given listener function.
    unsubscribe: listener => {
      const { subscribers } = storeInstances[storeId];
      const index = subscribers.indexOf(listener);
      if (index !== -1) {
        subscribers.splice(index, 1);
      }
    }
  };
  // Decorates the public store interface with the custom methods/dispatchers.
  const keys = Object.keys(dispatchers);
  const _dispatchers = keys.reduce((acc, methodName) => {
    const customMethod = dispatchers[methodName];
    return { ...acc, [methodName]: customMethod(_interface) };
  }, {});
  Object.assign(_interface, _dispatchers);
  return _interface;
}

function cacheSwap(storeId, nextValue) {
  // console.log('> cacheSwap: storeId, nextValue', storeId, nextValue);
  const previousValue = bestGuessCache[storeId].value;
  bestGuessCache[storeId].value = nextValue;
  bestGuessCache[storeId].prefer++;
  // console.log(
  //   '> : bestGuessCache[storeId].prefer',
  //   bestGuessCache[storeId].prefer
  // );
  const valuesAreDifferent = nextValue !== previousValue;
  if (valuesAreDifferent) {
    notifySubscribers(storeId, previousValue, nextValue);
  }
}

async function swap(storeId, nextValue, accessors) {
  const { getter, setter } = accessors;
  // Swapping means we got an update from the central source,
  // and we prefer that instead of the cache.
  // However, if we have outgoing action dispatches going on, we'd still prefer the cache.
  bestGuessCache[storeId].prefer--;
  // console.log(
  //   '> : bestGuessCache[storeId].prefer',
  //   bestGuessCache[storeId].prefer
  // );
  const previousValue = bestGuessCache[storeId].prefer
    ? bestGuessCache[storeId].value
    : await getter(storeId);
  // If there's no change, there's no need to swap.
  nextValue = bestGuessCache[storeId].prefer
    ? bestGuessCache[storeId].value
    : nextValue;
  const valuesAreDifferent = nextValue !== previousValue;
  // console.log('> swap');
  // console.log('> : bestGuessCache[storeId]', bestGuessCache[storeId]);
  // console.log('> : nextValue', nextValue);
  // console.log('> : previousValue', previousValue);
  // console.log('> swap: valuesAreDifferent', valuesAreDifferent);
  if (valuesAreDifferent) {
    await setter(storeId, nextValue);
    // We've notified subscribers when we made the quick prediction,
    // but the actual determination can take a little while.
    // Only if it comes back different than what we predicted, do we need to notify them again.
    const cacheDifference = nextValue !== bestGuessCache[storeId].value;
    // console.log('> : cacheDifference', cacheDifference);
    if (cacheDifference) {
      notifySubscribers(storeId, previousValue, nextValue);
    }
  }
}

function notifySubscribers(storeId, previousValue, currentValue) {
  // console.log('> notifySubscribers: currentValue', currentValue);
  // console.log('> : previousValue', previousValue);
  const { subscribers } = storeInstances[storeId];
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
