import React from 'react';
import qs from 'qs';
import Loadable from 'react-loadable';

// Route options: https://github.com/kriasoft/universal-router/blob/master/docs/api.md

export default function Route(path, action) {
  return {
    path,
    action
  };
}

export function PageAction(Page) {
  return (context, params) => (
    <Page {...PagePropsFromActionArgs(context, params)} />
  );
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

function PagePropsFromActionArgs(context, params) {
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
      await delay(2000);
      return await loader();
    },
    loading
  });
  return <LoadablePage {...restOfProps} />;
}

async function delay(ms) {
  return new Promise(resolve => {
    return setTimeout(resolve, ms);
  });
}
