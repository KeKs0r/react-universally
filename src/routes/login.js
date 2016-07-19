const LoginRoute = {
  path: 'login',
  getComponent: (nextState, cb) => {
    require.ensure([], (require) => {
      const comp = require('../components/Login');
      cb(null, comp.default);
    }, 'login')
  },
  indexRoute: {
    onEnter: (nextState, transition) => {
      transition('/login/first');
    }
  },
  getChildRoutes: (location, cb) => {
    require.ensure([], (require) => {
      const routes = [
        {path: 'first', component:require('../components/Login/first').default},
        {path: 'second', component:require('../components/Login/second').default},
      ];
      cb(null, routes);
    }, 'login');
  }
}

export default LoginRoute;
