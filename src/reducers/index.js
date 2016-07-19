import { combineReducers } from 'redux';
import { routerReducer as routing} from 'react-router-redux';
// import form from './form';
// import vatoms from './vatoms';
// import contacts from './contacts';
// import auth from './auth';
import ui from './ui';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    ui,
    routing,
    // form,
    // vatoms,
    // auth,
    // contacts,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
