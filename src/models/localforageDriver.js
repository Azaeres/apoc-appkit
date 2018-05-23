import localforage from 'localforage';
import { Driver } from 'models/Store';

const localforageDriver = Driver(initialize, getter, setter);
export default localforageDriver;

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
