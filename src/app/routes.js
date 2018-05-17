import React from 'react';
import One from 'views/pages/One';
import Two from 'views/pages/Two';
import NotFound404 from 'views/pages/404';
import Route, { PageAction, PagePropsFromActionArgs } from 'models/Route';
import Load from 'views/pages/Load';
import { PromiseStateMachine } from 'models/Promise';
import Store from 'models/Store';
import withStore from 'views/shared/withStore';

// Path matching rules: https://github.com/pillarjs/path-to-regexp
const routes = [
  Route('/one/:thing?', PageAction(One)),
  Route('/two', PageAction(Two)),
  Route('/load/foo', async (context, params) => {
    const props = PagePropsFromActionArgs(context, params);
    const { prefetch } = Load;
    if (prefetch === undefined) {
      return <Load {...props} />;
    } else {
      const promiseStore = Store(PromiseStateMachine());
      await promiseStore.addPromise(prefetch(props));
      const Component = withStore(promiseStore)(props => {
        return <Load {...props} />;
      });
      return <Component {...props} />;
    }
  }),
  Route('/load/:q?', PageAction(Load)),
  Route('(.*)', PageAction(NotFound404))
];

export default routes;
