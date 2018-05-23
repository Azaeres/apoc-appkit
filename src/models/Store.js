import guid from 'util/guid';
// import delay from 'util/delay';

const storeInstances = {};
const bestGuessCache = {};

export default function Store(
  { initialValue, reducer, dispatchers },
  persistenceDriver = InMemoryPersistenceDriver(),
  storeId = guid()
) {
  const { initialize } = persistenceDriver;
  // We prefer the cache until the initialize comes back.
  bestGuessCache[storeId] = { value: initialValue, prefer: 1 };
  storeInstances[storeId] = { reducer, subscribers: [] };
  // PROXY: On init we send a request to get the value of the upstream store.
  // Without waiting we call the persistence driver's initialize.
  // When we get the response from the upstream store, we prefer
  // that to the other storage mechanisms.
  initialize(storeId, initialValue).then(async value => {
    Object.assign(bestGuessCache[storeId], { value });
    return await swap(storeId, value, persistenceDriver);
  });
  return Interface(storeId, dispatchers, persistenceDriver);
}

export function InMemoryPersistenceDriver() {
  return Driver(
    async (storeId, initialValue) => {
      storeInstances[storeId].value = initialValue;
      return Promise.resolve(initialValue);
    },
    async storeId => {
      const { value } = storeInstances[storeId];
      return Promise.resolve(value);
    },
    (storeId, value) => {
      storeInstances[storeId].value = value;
      return Promise.resolve();
    }
  );
}

export function Driver(initialize, getter, setter) {
  return {
    initialize,
    getter,
    setter
  };
}

export function StateMachine(initialValue, reducer, dispatchers) {
  return { initialValue, reducer, dispatchers };
}

function Interface(storeId, dispatchers, persistenceDriver) {
  const { getter } = persistenceDriver;
  const dispatch = async action => {
    const { reducer } = storeInstances[storeId];
    // Local async, should be relatively quick
    const currentActualValue = await getter(storeId);
    const previousValue = bestGuessCache[storeId].prefer
      ? bestGuessCache[storeId].value
      : currentActualValue;
    // Syncronous, optimistic update
    const prediction = reducer(previousValue, action);
    cacheSwap(storeId, prediction);
    // Simulate delay with sending action, like over a network
    // console.log('#### Simulating network delay...');
    // await delay(3000);
    // This is the actual determination of the next value.

    // PROXY: On dispatch we send a dispatch request to the upstream
    // store. The following reduce should be *also* done by the upstream store.
    // When proxying we'll 1. reduce for the cache prediction, 2. reduce for the
    // local persistent store, and 3. reduce for the upstream store.
    // These are better guesses, respectively. Each time we get a better one, we'll
    // upgrade to it. Sync all three local storage containers to this better guess.
    // Notify subscribers when we swap in a better guess.
    // I think we can wrap store interface methods such as `dispatch`.
    const nextValue = reducer(previousValue, action);
    await swap(storeId, nextValue, persistenceDriver);
    return { nextValue, previousValue };
  };
  const _interface = {
    // The only way to change the value of a store over time.
    dispatch,
    // Syncronous and fast, but might differ from the actual value.
    get value() {
      return bestGuessCache[storeId].value;
    },
    // Gets you the actual value, but is asyncronous.
    async getValue() {
      if (bestGuessCache[storeId].prefer === 0) {
        return getter(storeId);
      } else {
        return Promise.resolve(this.value);
      }
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
  const previousValue = bestGuessCache[storeId].value;
  bestGuessCache[storeId].value = nextValue;
  bestGuessCache[storeId].prefer++;
  if (nextValue !== previousValue) {
    notifySubscribers(storeId, previousValue, nextValue);
  }
}

async function swap(storeId, nextValue, { getter, setter }) {
  // Swapping means we got an update from the central source,
  // and we prefer that instead of the cache.
  // However, if we have outgoing action dispatches going on, we'd still prefer the cache.
  bestGuessCache[storeId].prefer--;
  const previousValue = bestGuessCache[storeId].prefer
    ? bestGuessCache[storeId].value
    : await getter(storeId);
  // If we're prefering the cache, we're still awaiting a final update.
  // In other words, use the cache until ALL updates are in (the cache preference is 0)
  nextValue = bestGuessCache[storeId].prefer
    ? bestGuessCache[storeId].value
    : nextValue;
  // If there's no change, there's no need to swap.
  if (nextValue !== previousValue) {
    await setter(storeId, nextValue);
    // We've notified subscribers when we made the quick prediction,
    // but the actual determination can take a little while.
    // Only if it comes back different than what we predicted, do we need to notify them again.
    notifySubscribers(storeId, previousValue, nextValue);
  }
}

function notifySubscribers(storeId, previousValue, currentValue) {
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
