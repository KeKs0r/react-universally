import { base_url, vatomic_app_id, AUTH } from '../constants';
import { CALL_API } from 'redux-api-middleware';

const headers = {
  "X-Vatomic-App-Id": vatomic_app_id
}

export default function authenticationMiddleware(store) {
  return next => action => {
    if(action[CALL_API]){
      action = Object.assign(action,{
        [CALL_API] : Object.assign({}, action[CALL_API], {
          headers: Object.assign({}, action[CALL_API].headers, headers),
          credentials: 'include',
        })
      })
      //@todo: Overwrite failure with authentication error handler
      return next(action)
        // .then((res) => {
        //   console.log('Result Handler Api MiddleWare');
        //   console.log(res);
        // })
        // .catch((err) => {
        //   console.log('Error Handler Api MiddleWare');
        //   console.log(err);
        // });
    };
    return next(action);
  };
}
