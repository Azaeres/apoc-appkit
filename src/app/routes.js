import One from 'app/views/pages/One';
import Two from 'app/views/pages/Two';
import NotFound404 from 'app/views/pages/404';
import Route, { PageAction } from 'models/Route';
import Load from 'app/views/pages/Load';
import Prefetch from 'app/views/pages/Prefetch';
import Iframe from 'app/views/pages/Iframe';

// Path matching rules: https://github.com/pillarjs/path-to-regexp
const routes = [
  Route('/one/:thing?', PageAction(One)),
  Route('/two', PageAction(Two)),
  Route('/load/foo', PageAction(Load)),
  Route('/load/:q?', PageAction(Load)),
  Route('/prefetch', PageAction(Prefetch)),
  Route('/iframe', PageAction(Iframe)),
  Route('(.*)', PageAction(NotFound404))
];

export default routes;
