import React from 'react';
import { resultFromPromiseState, isPending, isFailure } from 'models/Promise';

export default function Loader({ value, children, loading, error }) {
  // console.log('> Loader: value', value);
  // console.log('> : Object.isFrozen(value)', Object.isFrozen(value));
  if (value === undefined) {
    return null;
  } else if (isPending(value)) {
    return <div>Loading...</div>;
  } else if (isFailure(value)) {
    return <div>Error!</div>;
  } else {
    const result = resultFromPromiseState(value);
    return children(result);
  }
}
