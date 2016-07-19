import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import App from '../components/App';
import LoginLayout from '../components/App/LoginLayout';

function handleError(err) {
  // TODO: Error handling, do we return an Error component here?
  console.log('==> Error occurred loading dynamic route'); // eslint-disable-line no-console
  console.log(err); // eslint-disable-line no-console
}

function resolveIndexComponent(nextState, cb) {
  System.import('../components/Home')
    .then(module => cb(null, module.default))
    .catch(handleError);
}

function resolveAboutComponent(nextState, cb) {
  System.import('../components/About')
    .then(module => cb(null, module.default))
    .catch(handleError);
}

function asyncResolve(name) {
  return function resolveChildren(nextState, cb) {
    System.import(`./${name}`)
      .then(module => cb(null, module.default))
      .catch(handleError);
  }
}


/**
 * Our routes.
 *
 * NOTE: We load our routes asynhronously using the `getComponent` API of
 * react-router, doing so combined with the `System.import` support by
 * webpack 2 allows us to get code splitting based on our routes.
 * @see https://github.com/reactjs/react-router/blob/master/docs/guides/DynamicRouting.md
 * @see https://gist.github.com/sokra/27b24881210b56bbaff7#code-splitting-with-es6
 */
const routes = {
  path: '/',
  component: App,
  indexRoute: {
    getComponent: resolveIndexComponent
  },
  childRoutes: [
    {path:'about', getComponent: resolveAboutComponent},
    {
      path: 'login',
      component: LoginLayout,
      // indexRoute: {
      //   onEnter: (nextState, transition) => {
      //     transition('/login/first');
      //   }
      // },
      getChildRoutes: asyncResolve('login')
    }
  ]
};

export default routes;
