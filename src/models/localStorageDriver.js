import { Driver } from 'models/Store';

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

const localStorageDriver = Driver(initialize, getter, setter);
export default localStorageDriver;
