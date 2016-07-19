import { AUTH } from '../constants';
import _ from 'lodash';

const persistedState = localStorage.getItem('auth')

const defaultState = {
  authenticated: false,
  user: {},
  confirmed:false,
  fetchingUser: false
}

const initialState = (persistedState) ? Object.assign({}, defaultState, JSON.parse(persistedState)) : defaultState

export default function persistentVatoms(state = initialState, action){
  const newState = vatoms(state, action);
  if(newState !== state){
    localStorage.setItem('auth', JSON.stringify(_.omit(newState,'confirmed', 'fetchingUser')));
  }
  return newState;
}

export function vatoms(state = initialState, action) {
  switch (action.type) {
    case 'FAILURE':
      if(_.get(action, 'payload.status') === 401){
        return Object.assign({}, state, {
          authenticated: false,
          confirmed: false,
          user: {}
        });
      }
      return state;
    case AUTH.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        authenticated: true,
        confirmed: true
      })
    case AUTH.SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        authenticated: true,
        confirmed: true
      })
    case AUTH.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        authenticated: false,
        confirmed: false,
        user: {}
      })
    case AUTH.SET_USER_STARTING:
        return Object.assign({}, state, {
          user: _.get(action, 'payload.payload.properties'),
          fetchingUser: true
        })
    case AUTH.SET_USER:
      return Object.assign({}, state, {
        user: Object.assign({},{id:_.get(action, 'payload.payload.id')},
        _.get(action, 'payload.payload.properties')),
        fetchingUser: false
      })
    case AUTH.UPDATE_USER:
      return Object.assign({}, state, {
        user: _.get(action, 'payload.payload.NewValue.properties'),
        fetchingUser: false
      })
    default: return state;
  }
}
