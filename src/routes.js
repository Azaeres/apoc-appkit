import React from 'react';
import Loadable from 'react-loadable';

const LoadablePage = Loadable({
  loader: async () => {
    await delay(2000);
    return await import('Bar.js');
  },
  loading() {
    return <div>Loading...</div>
  },
});

const routes = [
  { path: '/one/:thing?', action: (context, params) => {
    console.log("> : context", context);
    return (
      <h1>Page One {params.thing}</h1>
    );
  } },
  { path: '/two', action: () => <h1>Page Two</h1> },
  { path: '/load', action: () => <LoadablePage text="fdfsdf" /> },
  { path: '(.*)', action: () => <h1>Not Found</h1> }
];
export default routes;

async function delay(ms) {
  return new Promise((resolve) => {
    return setTimeout(resolve, ms);
  });
}
