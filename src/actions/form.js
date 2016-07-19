import { base_url, AUTH } from 'constants';
import { CALL_API } from 'redux-api-middleware';
import _ from 'lodash';
import { initialize, reset } from 'redux-form';
import { push } from 'react-router-redux'

export function validateLoginFields(values) {
  console.log("validating login fields")
  var email = values.email
  var password = values.password
  return _login(email,password)
}

export function validateLoginFieldsSuccess(payload) {
  //notify any component that cares
  console.log("validateLoginFieldsSuccess")
  return {type:AUTH.VALIDATE_LOGIN_FIELDS_SUCCESS};
}

export function validateLoginFieldsFailure(payload) {
  //notify any component that cares
  console.log("validateLoginFieldsFailure")
  return {type:AUTH.VALIDATE_LOGIN_FIELDS_FAILURE};
}


function _login(email, pass){
  console.log("called _login")
  const url = `${base_url}/user/vatomic/login`;
  return {
    [CALL_API]: {
      endpoint: url,
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: pass
      }),
      types: ['REQUEST', AUTH.LOGIN_SUCCESS, 'FAILURE']
    }
  }
}

function _phoneValidate(phone, pass){
  console.log("called _phoneValidate")
  const url = `${base_url}/user/vatomic/login`;
  return {
    [CALL_API]: {
      endpoint: url,
      method: 'POST',
      body: JSON.stringify({
        phone_number: phone,
        password: pass
      }),
      types: ['REQUEST', AUTH.LOGIN_SUCCESS, 'FAILURE']
    }
  }
}

export function validateRegisterFields(values) {
  console.log("validating register fields")
  var phoneNumber = values.phone_number
  var password = values.password
  return _phoneValidate(phoneNumber,password)
}

export function validateRegisterFieldsSuccess(payload) {
  //notify any component that cares
  console.log("validateRegisterFieldsSuccess")
  return {type:AUTH.VALIDATE_REGISTER_FIELDS_SUCCESS};
}

export function validateRegisterFieldsFailure(payload) {
  //notify any component that cares
  console.log("validateRegisterFieldsFailure")
  return {type:AUTH.VALIDATE_REGISTER_FIELDS_FAILURE};
}
