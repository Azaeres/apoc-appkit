import React from 'react';
import { hot } from 'react-hot-loader';
import { compose, pure } from 'recompose';
import Header from 'views/shared/Header';
import Loading from 'views/shared/Loading';
import Loadable from 'react-loadable';
import delay from 'util/delay';
import Navigation from 'views/shared/Navigation';

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
      <Navigation routerContext={props.context} />
      <LoadableComponent {...props} />
    </div>
  );
}

export default compose(hot(module), pure)(Load);
