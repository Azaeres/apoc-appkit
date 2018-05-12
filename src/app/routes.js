import One from 'views/pages/One';
import Two from 'views/pages/Two';
import NotFound404 from 'views/pages/404';
import Route, { PageAction, LoadablePageAction } from 'models/Route';
import Loading from 'views/shared/Loading';

// Path matching rules: https://github.com/pillarjs/path-to-regexp
const routes = [
  Route('/one/:thing?', PageAction(One)),
  Route('/two', PageAction(Two)),
  Route('/bar/:q?', LoadablePageAction(() => import('views/pages/Bar'), Loading)),
  Route('(.*)', PageAction(NotFound404))
];

export default routes;
