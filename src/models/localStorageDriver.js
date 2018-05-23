import { Driver } from 'models/Store';

const localStorageDriver = Driver(initialize, getter, setter);
export default localStorageDriver;

async function initialize(storeId, initialValue) {
  const value = JSON.parse(localStorage.getItem(storeId));
  if (value === null) {
    return Promise.resolve(initialValue);
  } else {
    return Promise.resolve(value);
  }
}

async function getter(storeId) {
  const value = localStorage.getItem(storeId);
  return Promise.resolve(JSON.parse(value));
}

async function setter(storeId, value) {
  localStorage.setItem(storeId, JSON.stringify(value));
  return Promise.resolve();
}
