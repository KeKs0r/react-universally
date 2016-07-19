/**
 * Created by MR_Cheddar on 2016/06/01.
 */
import { CALL_API } from 'redux-api-middleware';

export function loadCountry(){
    return (dispatch) => {
        dispatch(_loadCountry)
            .then((resp) => {
                if(resp && resp.country){
                   // dispatch(getUser());
                }
            })
    }
}

function _loadCountry(){
    const url = "http://ipinfo.io";
    return {
        [CALL_API]: {
            endpoint: url,
            method: 'GET',
            headers: { 'dataType': 'jsonp' },
            types: ['REQUEST', 'SUCCESS', 'FAILURE']
        }
    }
}