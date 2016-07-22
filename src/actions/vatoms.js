import { base_url, vatomic_app_id, VATOMS_LOAD, VATOM_LOAD, VATOM_SEND, VATOM_DELETE } from '../constants';
import { CALL_API } from 'redux-api-middleware';
import { push } from 'react-router-redux'
import { animateActiveCard } from './ui';
import { TRANSITIONS } from '../helpers/transitions';
import _ from 'lodash';

const headers = {
  "X-Vatomic-App-Id": vatomic_app_id
}


export function fetchVatoms(){
  const url =  `${base_url}/currentuser/inventory/root`;
  return {
    [CALL_API]: {
      endpoint: url,
      method: 'GET',
      types: ['REQUEST', VATOMS_LOAD.SUCCESS, 'FAILURE']
    }
  }
}

export function fetchVatomOrRedirect(vatomId){
  return (dispatch) => {
    setTimeout(() => {
      dispatch(fetchVatom(vatomId))
      .then((resp) => {
        const status = _.get(resp, 'payload.status');
        if(resp && resp.error &&
          (status === 404 || status === 403 ||  status === 401)
          ){
          dispatch(push('/vatoms'));
        }
      })
    }, 3000);
  }
}

export function fetchVatom(vatomId){
  const url =  `${base_url}/currentuser/vatom/${vatomId}`;
  return {
    [CALL_API]: {
      endpoint: url,
      method: 'GET',
      // Other failure to not get logged out if fails
      types: ['REQUEST', VATOM_LOAD.SUCCESS, 'FAILURE_']
    }
  }
}

export function sendVatom(vatom, to, note) {
  return (dispatch) => {
    dispatch(_sendVatom(vatom, to, note))
      .then((resp) => {
        if(resp && !resp.error){
          setTimeout(() => {
            dispatch(animateActiveCard(TRANSITIONS.bounceOut));
            setTimeout(() => {
              // This will also turn into showing a spinner
              dispatch(fetchVatoms())
              //Directly navigate Away....
              dispatch(push('/vatoms/grid'));
              dispatch(animateActiveCard(TRANSITIONS.whirlIn));
            },600);
          },2000);
        }
      })
    }
}

export function deleteVatom(vatom){
  return (dispatch) => {
    // Currently only for animation testing
    //dispatch(_deletedVatom(vatom));

    dispatch(_sendVatom(vatom, 'junk@vatomic.io'))
      .then((resp) => {
        if(resp && !resp.error){
          dispatch(_deletedVatom(vatom));
          dispatch(fetchVatoms())
        }
      })

    }
}

function _deletedVatom(vatom){
  return {
    type: VATOM_DELETE.SUCCESS,
    vatom: vatom
  }
}

export function _sendVatom(vatom, to, note) {
  const url =  `${base_url}/currentuser/action/Transfer`;
  var post = {
    'this.id': vatom,
  };
  if(to.email){
    post['new.owner.email'] = to.email;
  } else if(to.phone){
    post['new.owner.phone_number'] = to.phone;
  } else if(to.uid){
    post['new.owner.id'] = to.uid;
  }
  return {
    [CALL_API]: {
      endpoint: url,
      method: 'POST',
      body: JSON.stringify(post),
      types: ['REQUEST', VATOM_SEND.SUCCESS, 'FAILURE']
    }
  }
}


  /*
  const url = `${base_url}/currentuser/inventory/root`;
  return dispatch => {
    dispatch({type:VATOMS_LOAD.START});
    return fetch(url, {
        headers: headers,
        mode: 'cors',
        credentials: 'include'
      })
    })
    .then((res) => res.json())
    .then(
      (data) => { dispatch({type:VATOMS_LOAD.SUCCESS, data})}
    )
    .catch(
      (err) => { dispatch({type:VATOMS_LOAD.ERROR, err})}
    );
  }
}
*/
