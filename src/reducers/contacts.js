import { CONTACTS_LOAD}  from '../constants';
import _ from 'lodash';

const initialState = {
  data: {}
}

const mergeUser = (state, action) => {
  var mergeWith = {};
  mergeWith[action.meta.uid] = Object.assign({},state.data[action.meta.uid],{
    uid: action.meta.uid
  }, action.payload.payload);
  return Object.assign({}, state, {
    data:Object.assign({}, state.data, mergeWith)
  })
}

const saveVatomTransferUserTuple = (state, action) => {
  return Object.assign({}, state, {
    data:Object.assign({}, state.data, {transfered_by:action.payload.payload})
  })
}

export default function vatoms(state = initialState, action) {

  switch (action.type) {
    case CONTACTS_LOAD.AVATAR.SUCCESS:
      return mergeUser(state, action);
    case CONTACTS_LOAD.NAME.SUCCESS:
      return mergeUser(state, action);
    case CONTACTS_LOAD.TRANSFER.SUCCESS:
        return saveVatomTransferUserTuple(state, action);
    default: return state;
  }
}
