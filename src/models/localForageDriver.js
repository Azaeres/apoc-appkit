import localforage from 'localforage';
import { Driver } from 'models/Store';

const localForageDriver = Driver(initialize, getter, setter);
export default localForageDriver;

// window.clear = () => localforage.clear();

async function initialize(storeId, initialValue) {
  const value = await localforage.getItem(storeId);
  if (value === null) {
    return initialValue;
  } else {
    return value;
  }
}

async function getter(storeId) {
  return await localforage.getItem(storeId);
}

async function setter(storeId, value) {
  return await localforage.setItem(storeId, value);
}
