import React from 'react';
import { hot } from 'react-hot-loader';
import { compose, pure, setStatic } from 'recompose';
import Header from 'views/shared/Header';
import delay from 'util/delay';
import idx from 'idx';
import Loader from 'views/shared/Loader';
import Navigation from 'views/shared/Navigation';

function Prefetch({ context, prefetch }) {
  return (
    <div>
      <Header title="Prefetch" />
      <Navigation routerContext={context} />
      <Loader
        value={prefetch}
        loading={() => <div>Loading...</div>}
        error={error => <div>Error!</div>}
      >
        {value => {
          const foo = idx(value, _ => _.foo);
          return (
            <div>
              Prefetched data: <span>{foo}</span>
            </div>
          );
        }}
      </Loader>
    </div>
  );
}

export default compose(
  hot(module),
  setStatic('prefetch', async (...args) => {
    await delay(1500);
    return { foo: 'bar' };
  }),
  pure
)(Prefetch);
