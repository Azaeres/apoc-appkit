import React from 'react';
import { hot } from 'react-hot-loader';
import { compose, pure } from 'recompose';
import Header from 'views/shared/Header';
import Loading from 'views/shared/Loading';
import Loadable from 'react-loadable';
import delay from 'util/delay';

const LoadableComponent = Loadable({
  loader: () => {
    return delay(() => import('views/shared/LoadPageContent'), 2000);
  },
  loading: Loading
});

function Load(props) {
  return (
    <div>
      <Header title="Loadable Page" />
      <LoadableComponent {...props} />
      <div>
        <a href="/#/one">One</a>
      </div>
      <div>
        <a href="/#/two">Two</a>
      </div>
    </div>
  );
}

export default compose(hot(module), pure)(Load);
