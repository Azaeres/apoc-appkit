import React from 'react';
import { resultFromPromiseState, isPending, isFailure, isEmpty } from 'models/Promise';

export default function Loader({ value, children, loading, error }) {
  // console.log('> Loader render: value', value);
  // console.log('> : Object.isFrozen(value)', Object.isFrozen(value));
  if (value === undefined) {
    return null;
  } else if (isEmpty(value)) {
    // console.log('> Loader isEmpty ');
    return null;
  } else if (isPending(value)) {
    // console.log('> Loader isPending: ', value);
    if (typeof loading === 'function') {
      return loading();
    } else {
      return <div>Loading...</div>;
    }
  } else if (isFailure(value)) {
    // console.log('> Loader isFailure: ');
    if (typeof error === 'function') {
      return error();
    } else {
      return <div>Error!</div>;
    }
  } else {
    const result = resultFromPromiseState(value);
    // console.log('> isSuccess: result', result);
    return children(result);
  }
}
