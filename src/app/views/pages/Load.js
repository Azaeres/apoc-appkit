import React from 'react';
import { hot } from 'react-hot-loader';
import { compose, pure, setStatic } from 'recompose';
import Header from 'views/shared/Header';
import Loading from 'views/shared/Loading';
import Loadable from 'react-loadable';
import delay from 'util/delay';
import idx from 'idx';
import Loader from 'views/shared/Loader';

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
      <Loader
        value={props.prefetch}
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
      <div>
        <a href="/#/one">One</a>
      </div>
      <div>
        <a href="/#/two">Two</a>
      </div>
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
)(Load);
