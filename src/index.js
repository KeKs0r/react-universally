import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import match from 'react-router/lib/match';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import createStore from './store/configureStore';
import routes from './routes';



// Get the DOM Element that will host our React application.
const MOUNT_NODE = document.getElementById('app');

// Redux Application
const store = createStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.routing
})
const initialState = window.APP_STATE;
function renderApp() {
  // As we are using dynamic react-router routes we have to use the following
  // asynchronous routing mechanism supported by the `match` function.
  // @see https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
  match({ history: history, routes }, (error, redirectLocation, renderProps) => {
    if (error) {
      // TODO: Error handling.
      console.log('==> 😭  React Router match failed.'); // eslint-disable-line no-console
    }

    render(
      <AppContainer>
        <Provider store={store}>
          {/*
          We need to explicly render the Router component here instead of have
          this embedded within a shared App type of component as we use different
          router base components for client vs server rendering.
          */}
          <Router {...renderProps} />
        </Provider>
      </AppContainer>,
      MOUNT_NODE
    );
  });
}

if (process.env.NODE_ENV === 'development' && window.devToolsExtension) {
  window.devToolsExtension.open()
}

// The following is needed so that we can hot reload our App.
if (process.env.NODE_ENV === 'development' && module.hot) {
  // Accept changes to this file for hot reloading.
  module.hot.accept();
  // Any changes to our routes will cause a hotload re-render.
  module.hot.accept('./routes', renderApp);
}

renderApp();
