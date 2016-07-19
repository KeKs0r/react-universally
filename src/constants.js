/* Global Constants */
  export const vatomic_app_id = 'ce380524-88fb-4fb0-ab67-384c619680af';
  export const base_url = 'https://api.vatomic.net/api/v1';
  export const fb_app_id = '508786382645878';
  export const google_client_id = '887036920144-bktj8o22vfvcl9alqs2q1fhegg31tuba.apps.googleusercontent.com'

/* Action Constants */
  /* VatomActions */
  export const VATOMS_LOAD = {
    START: 'VATOMS_LOAD_START',
    SUCCESS:'VATOMS_LOAD_SUCCESS',
    ERROR: 'VATOMS_LOAD_ERROR'
  };

  export const VATOM_LOAD = {
    // START: 'VATOMS_LOAD_START',
    SUCCESS:'VATOM_LOAD_SUCCESS',
    // ERROR: 'VATOMS_LOAD_ERROR'
  };

  export const VATOM_SEND = {
    // 'REQUEST': 'VATOM_SEND_REQUEST'
    'SUCCESS': 'VATOM_SEND_SUCCESS',
    // 'ERROR': 'VATOM_SEND_ERROR'
  }

  export const VATOM_DELETE = {
    'SUCCESS': 'VATOM_DELETE_SUCCESS'
  }

  export const CONTACTS_LOAD = {
    AVATAR: {
      SUCCESS:'CONTACTS_LOAD_AVATAR_SUCCESS',
    },
    NAME: {
      SUCCESS: 'CONTACTS_LOAD_NAME_SUCCESS',
    },
    TRANSFER: {
      SUCCESS : 'CONTACTS_LOAD_TRANSFER_SUCCESS'
    }
  };

  export const AUTH = {
    VALIDATE_LOGIN_FIELDS : 'AUTH_VALIDATE_LOGIN_FIELDS',
    VALIDATE_LOGIN_FIELDS_SUCCESS : 'AUTH_VALIDATE_LOGIN_FIELDS_SUCCESS',
    VALIDATE_LOGIN_FIELDS_FAILURE : 'AUTH_VALIDATE_LOGIN_FIELDS_FAILURE',
    VALIDATE_REGISTER_FIELDS : 'AUTH_VALIDATE_REGISTER_FIELDS',
    VALIDATE_REGISTER_FIELDS_SUCCESS : 'AUTH_VALIDATE_REGISTER_FIELDS_SUCCESS',
    VALIDATE_REGISTER_FIELDS_FAILURE : 'AUTH_VALIDATE_REGISTER_FIELDS_FAILURE',
    LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
    LOGIN_SUCCESS_GUEST: 'AUTH_LOGIN_SUCCESS_GUEST',
    LOGOUT_SUCCESS: 'AUTH_LOGOUT_SUCCESS',
    DISCARD_TOKEN: 'AUTH_DISCARD_TOKEN',
    SET_USER_STARTING: 'AUTH_SET_USER_STARTING',
    SET_USER: 'AUTH_SET_USER',
    UPDATE_USER: 'AUTH_UPDATE_USER',
    OAUTH_LOGIN: 'AUTH_OAUTH_LOGIN',
    SIGNUP_SUCCESS: 'AUTH_SIGNUP_SUCCESS',
    VERIFY_SUCCESS: 'AUTH_VERIFY_SUCCESS',
    VERIFY_FAILED: 'AUTH_VERIFY_FAILED',
    //FACEBOOK_AUTH: 'AUTH_FACEBOOK_AUTH',
  }

  export const UI = {
    CATEGORY_DRAWER: 'UI_CATEGORY_DRAWER',
    SEND: {
      // SHOW_CONFIRMATION: 'UI_SEND_SHOW_CONFIRMATION',
      HIDE_CONFIRMATION: 'UI_SEND_HIDE_CONFIRMATION',
      SHOW_CONTACTS_VIEW: 'UI_SEND_TOGGLE_CONTACTS'
    },
    MODAL: 'MODAL_OPEN',
    SORTING: {
      // Sorting Action
      CHANGE_SORTING: 'UI_SORTING_CHANGE',
      // Actual Sorting Values
      ALPHA_DESC: 'UI_SORTING_SORTING_DESC',
      ALPHA_ASC: 'UI_SORTING_SORTING_ASC',
      MOST_RECENT: 'UI_SORTING_MOST_RECENT'

    },
    ACTIVECARD_TRANSITION: 'UI_ACTIVECARD_TRANSITION',
    SEARCH: 'UI_SEARCH_ACTIVE'
  }

