import One from 'views/pages/One';
import Two from 'views/pages/Two';
import NotFound404 from 'views/pages/404';
import Route, { PageAction } from 'models/Route';
import Load from 'views/pages/Load';

// Path matching rules: https://github.com/pillarjs/path-to-regexp
const routes = [
  Route('/one/:thing?', PageAction(One)),
  Route('/two', PageAction(Two)),
  Route('/load/:q?', PageAction(Load)),
  Route('(.*)', PageAction(NotFound404))
];

export default routes;
