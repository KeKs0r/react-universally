import { base_url, AUTH } from 'constants';
import { CALL_API , getJSON, ApiError } from 'redux-api-middleware';
import _ from 'lodash';
import { initialize, reset } from 'redux-form';
import { push } from 'react-router-redux'
import { detectPrivateMode } from '../helpers/private'

/*
 * This import has quite the Tail
 * Maybe this can be prevented with "Sagas"
 */
import { fetchVatoms } from './vatoms'


export const ERROR = {
  UNAUTHORIZED:1001,
  INVALID_PASSWORD: 1026,
  USERNAME_NOT_FOUND: 1014,
  ACCOUNT_NOT_FOUND: 1016
}

/*
 Use this when you know the user exists AUTH.USER_EXISTS
*/
export function loginWithPassword(email,password)
{
  return (dispatch) => {
      dispatch(_login({email:email}, password))
        .then((resp) => {
          dispatch(getUser());
      })
  }
}

export function login(email){

  return (dispatch) => {
      dispatch(_login({email:email},""))
        .then((resp) => {
          dispatch(_handlePasswordlessLoginResponse(resp))
      })
  }
}
/*
  Manages login state
*/
function _handlePasswordlessLoginResponse(resp){
return (dispatch) => {
  let data = resp.payload.response;
  if (data.error) { //error condition case
    switch (data.error) {
      case ERROR.UNAUTHORIZED:
      case ERROR.INVALID_PASSWORD:
          console.log("Invalid Password. Normal Login")
          // setup the state for the next screen
          dispatch({type:AUTH.USER_EXISTS}).then((resp)=>{
            dispatch(push("/login/password-enter"))
          })
        break;
      case ERROR.USERNAME_NOT_FOUND:
      case ERROR.ACCOUNT_NOT_FOUND:
          console.log("Account Not Found - New User case");
          dispatch({type:AUTH.NEW_USER}).then((resp)=>{
            dispatch(push("/login/password-enter"))
          })
        break;
      default:

    }
  } else {
    if(resp && !resp.error){ //200 response from API
        //we sent the user a link because they have an unprotected Account
        dispatch({type:AUTH.UNPROTECTED_ACCOUNT}).then((resp)=>{
          dispatch(push("/login/verify-code"))
        })
    }
  }
}
}

export function logoutGuestLoginAndPatch(guest, email, phone_number){
  return (dispatch) => {
        console.log("not private - logout - guestLoginAndPatch")
        dispatch(logout())
        .then((resp) => {
          dispatch(guestLoginAndPatch(guest, email, phone_number));
        })
      }
}

export function guestLoginAndPatch(guest, email, phone_number){
  return (dispatch) => {
    detectPrivateMode(function(privateMode){
      if (privateMode) {
        dispatch(push("/private"))
      } else {
          dispatch(_guestLogin(guest))
            .then((resp) => {
              var payload = {
                password: 'test'
              };
              if(email){
                payload.email = email;
              }
              if(phone_number){
                payload.phone_number = phone_number;
              }
              if(resp && !resp.error){
                if(email || phone_number){
                  dispatch(_updateUser(payload))
                }
                setTimeout(()=> {
                  dispatch(fetchVatoms());
                },500);
              } else { // Guest Login failed, try email and default pass
                dispatch(_login(payload, 'test'))
                  .then((resp) => {
                    if(resp && !resp.error){
                      setTimeout(()=> {
                        dispatch(fetchVatoms());
                      },500);
                    }
                  });
                }
          })
        }
      })
  }
}

export function guestLogin(guestid, email){
  return (dispatch) => {
      dispatch(_guestLogin(guestid))
        .then((resp) => {
          if(resp && !resp.error){
          } else if(email) { // Guest Login failed, try email and default pass
            dispatch(_login({email:email}, 'test'));
          }
      })
  }
}

export function guestInit(email, phone_number){
  return (dispatch) => {
    let formValues = {};
    if(email){
      formValues.email = email;
    }
    if(phone_number){
      formValues.phone_number;
    }
    dispatch(initialize('register',formValues, ['email', 'phone_number']));
  }
}


export function updateUser(fields, redirect){
  return (dispatch) => {
      dispatch(_updateUser(fields))
        .then((resp) => {
          if(resp && !resp.error){
            if(redirect){
              dispatch(push(redirect));
            }
            dispatch(reset('profile'));
          }
      });
  }
}

function _updateUser(fields){
  const url = `${base_url}/currentuser`;
  const payload = fields;
  return {
    [CALL_API]: {
      endpoint: url,
      method: 'PATCH',
      body: JSON.stringify(payload),
      types: ['REQUEST', AUTH.UPDATE_USER, 'FAILURE']
    }
  }
}

export function uploadAvatar(avatar, redirect){
  return (dispatch) => {
      dispatch(_uploadAvatar(avatar))
        .then((resp) => {
          if(resp && !resp.error){
            if(redirect){
              dispatch(push(redirect));
            }
            dispatch(reset('profile'));
          }
      });
  }
}

function _uploadAvatar(avatar){
  const url = `${base_url}/currentuser/avatar`;
  const formData = new FormData();
  formData.append('avatar', avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
  return {
    [CALL_API]: {
      endpoint: url,
      method: 'POST',
      body: formData,
      types: ['REQUEST', AUTH.UPDATE_USER, 'FAILURE']
    }
  }
}

export function logout(){
  const url = `${base_url}/currentuser/logout`;
  //localStorage.clear();
  return {
    [CALL_API]: {
      endpoint: url,
      method: 'GET',
      types: [AUTH.LOGOUT_SUCCESS, AUTH.LOGOUT_SUCCESS, 'FAILURE']
    }
  }
}

export function _resetPassword(userName){
  const payload = (userName.indexOf('@') > -1) ?  {email: userName} : {phone_number: userName}
  const url = `${base_url}/user/resetpwd`;
  return {
    [CALL_API]: {
      body: JSON.stringify(payload),
      endpoint: url,
      method: 'POST',
      types: ['REQUEST', 'SUCCESS', 'FAILURE']
    }
  }
}

export function resetPassword(userName){
  return (dispatch) => {
      dispatch(_resetPassword(userName))
        .then((resp) => {
          if(resp && !resp.error){
            dispatch(push("login/login-start"));
          }
        })
  }
}

export function getUser(){
  const url = `${base_url}/currentuser`;
  return {
    [CALL_API]: {
      endpoint: url,
      method: 'GET',
      types: [AUTH.SET_USER_STARTING, AUTH.SET_USER, 'FAILURE']
    }
  }
}

export function signup(userdata, redirect){
  return (dispatch) => {
      dispatch(_signup(userdata))
        .then((resp) => {
          if(resp && !resp.error){
            dispatch(getUser());
            if(redirect){
              dispatch(push(redirect));
            }
          }
        })
  }
}

export function verify(token, phone_number, email){
  return (dispatch) => {
      dispatch(_verifyCode(token, phone_number, email))
        .then((resp) => {
          if(resp && !resp.error){
            dispatch(push("login/profile-complete"));
          }
        })
  }
}

export function facebookAuth(oauth){
  console.log(oauth);
  return (dispatch) => {
    dispatch(_backendOAuth('Facebook', oauth.accessToken))
      .then((resp) => {
        const errorCode = _.get(resp, 'payload.response.error');
        // User is not yet registered
        if(resp && resp.error && errorCode === 1016){
          dispatch(startRegistration({
            full_name: oauth.name,
            email: oauth.email,
            avatar_uri: _.get(oauth, 'picture.data.url'),
            oauth: {
              id: oauth.id,
              provider: 'Facebook'
            }
          }));
        } else if (resp && !resp.error) {
          dispatch(getUser());
        }
      })
  }
}

export function googleAuth(oauth){
  console.log(oauth);
  const accessToken = _.get(oauth, 'hg.access_token');
  return (dispatch) => {
    dispatch(_backendOAuth('Google', accessToken))
      .then((resp) => {
        const errorCode = _.get(resp, 'payload.response.error');
        // User is not yet registered
        if(resp && resp.error && errorCode === 1016){
          dispatch(startRegistration({
            full_name: _.get(oauth, 'wc.wc'),
            email: _.get(oauth,'wc.hg'),
            avatar_uri: _.get(oauth, 'wc.Ph'),
            oauth: {
              id: _.get(oauth, 'wc.Ka'),
              provider: 'Facebook'
            }
          }));
        } else if (resp && !resp.error) {
          dispatch(getUser());
        }
      })
  }
}

function startRegistration(preset){
    return (dispatch) => {
      const fields = _.keys(preset);
      dispatch(initialize('register', preset, fields));
      dispatch(push('/login/your-info'));
    }
}

function _signup(formData){
  const url = `${base_url}/user/register`;
  return {
    [CALL_API]: {
      endpoint: url,
      method: 'POST',
      body: JSON.stringify(formData),
      types: ['REQUEST', AUTH.SIGNUP_SUCCESS, 'FAILURE']
    }
  }
}

function _verifyCode(token, phone_number, email){
  const url = `${base_url}/user/verify`;
  var formData = {
    token: token
  };
  if(phone_number){
    formData.phone_number = phone_number;
  }
  if(email) {
    formData.email = email;
  }
  return {
    [CALL_API]: {
      endpoint: url,
      method: 'POST',
      body: JSON.stringify(formData),
      types: ['REQUEST', AUTH.VERIFY_SUCCESS, AUTH.VERIFY_FAILED]
    }
  }
}

function _backendOAuth(provider, token){
  const url = `${base_url}/user/oauth/login`;
  return {
    [CALL_API]: {
      endpoint: url,
      method: 'POST',
      body: JSON.stringify({
        oauth_provider: provider,
        token: token
      }),
      types: ['REQUEST', AUTH.LOGIN_SUCCESS, 'FAILURE']
    }
  }
}

// function _login(credential, pass){
//   const url = `${base_url}/user/vatomic/login`;
//   var payload = Object.assign({password:pass}, credential);
//   return {
//     [CALL_API]: {
//       endpoint: url,
//       method: 'POST',
//       body: JSON.stringify(payload),
//       types: ['REQUEST', AUTH.LOGIN_SUCCESS,
//       'FAILURE']
//     }
//   }
// }

function _login(credential, pass){
  const url = `${base_url}/user/vatomic/login`;
  var payload = Object.assign({password:pass}, credential);
  return {
    [CALL_API]: {
      endpoint: url,
      method: 'POST',
      body: JSON.stringify(payload),
      types: [{
        type: AUTH.LOGIN_REQUEST,
        meta: { credential }
      }, AUTH.LOGIN_SUCCESS,
      'FAILURE']
    }
  }
}

function _guestLogin(guestid){
  const url = `${base_url}/user/vatomic/login`;
  return {
    [CALL_API]: {
      endpoint: url,
      method: 'POST',
      body: JSON.stringify({guest_id: guestid}),
      types: ['REQUEST', AUTH.LOGIN_SUCCESS, 'FAILURE']
    }
  }
}
