import localforage from 'localforage';
import { Driver } from 'models/Store';

const initialize = async storeId => {
  // console.log('> initialize: storeId', storeId);
  const getItemPromise = localforage.getItem(storeId).then(got => {
    // console.log('> : got', got);
    const initial = got === null ? undefined : got;
    // console.log('> : initial', initial);
    return initial;
  });
  return getItemPromise;
};
const getter = async storeId => {
  // console.log('> get : ', storeId);
  // const value = cache[storeId];
  return await localforage.getItem(storeId);
};
const setter = async (storeId, value) => {
  // console.log('> set : storeId', storeId);
  // console.log('> : value', value);
  // cache[storeId] = value;
  const result = await localforage.setItem(storeId, value);
  // console.log('> set : result', result);
  return result;
};

const localforageDriver = Driver(initialize, getter, setter);
export default localforageDriver;

// window.clear = () => localforage.clear();
