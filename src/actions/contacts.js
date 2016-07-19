import { CONTACTS_LOAD, base_url } from '../constants';
import { CALL_API } from 'redux-api-middleware';



export function fetchUserAvatar(uid){
  const url =  `${base_url}/user/avatar?key=id&val=${uid}`;
  return {
    [CALL_API]: {
      endpoint: url,
      method: 'GET',
      types: [
        'REQUEST',
        {
          type: CONTACTS_LOAD.AVATAR.SUCCESS,
          meta: {
            uid
          }
        },
        'FAILURE']
    }
  }
}

export function fetchUserName(uid){
  const url =  `${base_url}/user/name?key=id&val=${uid}`;
  return {
    [CALL_API]: {
      endpoint: url,
      method: 'GET',
      types: [
        'REQUEST',
        {
          type: CONTACTS_LOAD.NAME.SUCCESS,
          meta: {
            uid
          }
        },
        'FAILURE']
    }
  }
}

export function fetchUserNameForTransfer(uid){
  const url =  `${base_url}/user/name?key=id&val=${uid}`;
  return {
    [CALL_API]: {
      endpoint: url,
      method: 'GET',
      types: [
        'REQUEST',
        CONTACTS_LOAD.TRANSFER.SUCCESS,
        'FAILURE']
    }
  }
}
