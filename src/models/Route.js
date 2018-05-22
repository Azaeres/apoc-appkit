import React from 'react';
import qs from 'qs';
import Loadable from 'react-loadable';
import delay from 'util/delay';
import { PromiseStateMachine } from 'models/Promise';
import Store from 'models/Store';
import withStore from 'views/shared/withStore';
import memoize from 'lodash.memoize';

// Route options: https://github.com/kriasoft/universal-router/blob/master/docs/api.md

export default function Route(path, action) {
  return {
    path,
    action
  };
}

const PromiseStore = memoize((Page, storeId) => {
  // console.log('> PromiseStore : storeId', storeId);
  return Store(PromiseStateMachine(), undefined, storeId);
});

export function PageAction(Page) {
  return async (context, params) => {
    const props = PagePropsFromActionArgs(context, params);
    const { prefetch } = Page;
    if (prefetch === undefined) {
      return <Page {...props} />;
    } else {
      // console.log('> PageAction: context', context);
      // console.log('> params: ');
      const promiseStore = PromiseStore(Page, `prefetch:"${context.path}"`);
      // console.log('>############# adding promise : ', promiseStore.value);
      promiseStore.addPromise(prefetch(props));
      const Component = withStore(promiseStore, undefined, 'prefetch')(
        props => {
          return <Page {...props} />;
        }
      );
      return <Component {...props} />;
    }
  };
}

export function LoadablePageAction(loader, loading) {
  return (context, params) => (
    <LoadablePage
      {...PagePropsFromActionArgs(context, params)}
      loader={loader}
      loading={loading}
    />
  );
}

export function PagePropsFromActionArgs(context, params) {
  const { path } = context;
  const [, queryStr] = path.split('?');
  const query = qs.parse(queryStr);
  return {
    context,
    params,
    query
  };
}

function LoadablePage({ loader, loading, ...restOfProps }) {
  const LoadablePage = Loadable({
    loader: async () => {
      await delay(400);
      return await loader();
    },
    loading
  });
  return <LoadablePage {...restOfProps} />;
}
