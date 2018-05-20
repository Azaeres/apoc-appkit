import React from 'react';
import { hot } from 'react-hot-loader';
import { compose, pure, setStatic } from 'recompose';
import Header from 'views/shared/Header';
import Loading from 'views/shared/Loading';
import Loadable from 'react-loadable';
import delay from 'util/delay';
import { resultFromPromiseState, isPending, isFailure } from 'models/Promise';
import idx from 'idx';

const LoadableComponent = Loadable({
  loader: async () => {
    await delay(2000);
    return import('views/shared/LoadPageContent');
  },
  loading: Loading
});

function Load(props) {
  return (
    <div>
      <Header title="Loadable Page" />
      <LoadableComponent {...props} />
      <Data {...props} />
      <div>
        <a href="/#/one">One</a>
      </div>
      <div>
        <a href="/#/two">Two</a>
      </div>
    </div>
  );
}

function Data({ value }) {
  if (value === undefined) {
    return null;
  } else if (isPending(value)) {
    return <div>Loading...</div>;
  } else if (isFailure(value)) {
    return <div>Error!</div>;
  } else {
    const result = resultFromPromiseState(value);
    const foo = idx(result, _ => _.foo);
    return (
      <div>
        Prefetched data: <span>{foo}</span>
      </div>
    );
  }
}

export default compose(
  hot(module),
  setStatic('prefetch', async (...args) => {
    await delay(1500);
    return { foo: 'bar' };
  }),
  pure
)(Load);
