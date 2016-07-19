import { reducer as formReducer} from 'redux-form';
import _ from 'lodash';
import countries from '../data/country_codes';
import Phone from 'phone';

const normalizeFirstName = (value, previousValue, allValues, previousAllValues) => {
  const fullName = allValues.full_name;
  if(fullName !== previousAllValues.full_name){
      return _.head(_.split(fullName, ' '));
  }
  return value;
}

const normalizeLastName = (value, previousValue, allValues, previousAllValues) => {
  const fullName = allValues.full_name;
  if(fullName !== previousAllValues.full_name){
      const parts = _.split(fullName, ' ');
      parts.shift();
      if(_.size(parts) > 0){
        return parts.join(' ');
      }
  }
  return value;
}

const normalizeFullName = (value, previousValue, allValues, previousAllValues) => {
  if(!value){
      const first = (allValues.first_name) ? allValues.first_name : '';
      const last = (allValues.last_name) ? allValues.last_name: '';
      return first + ' ' + last;
  }
}

const  _randomString = (length) => {
  return _(length).range().map(_.partial(_.random, 33, 126, false)).map(_.ary(String.fromCharCode)).join('');
};

const normalizePassword = (value, previousValue, allValues, previousAllValues) => {
  if(allValues.oauth !== previousAllValues.full_name && !value){
      return _randomString(8);
  }
  return value;
}

const normalizePhonePrefix = (value, previousValue, allValues, previousAllValues) => {
  if(allValues.country !== previousAllValues.country){
      const country = allValues.country;
      const countryCode = _.find(countries, {code: country});
      return _.get(countryCode, 'dial_code');
  }
  return (value) ? value : '+1';
}

const normalizeCountry = (value) =>{
  return (value) ? value : 'US';
}

const normalizePhone = (value, previousValue, allValues, previousAllValues) => {
  if(allValues.phone_suffix) {
    var phone = new Phone(allValues.phone_prefix + allValues.phone_suffix);
    return phone[0];
  }
  return value;
}

const normalizeSendValue = (value, previousValue, allValues, previousAllValues) => {
    if(allValues.name !== previousAllValues.name){
      return allValues.name;
    }
    if(allValues.phone !== previousAllValues.phone){
      return allValues.phone;
    }
    if(allValues.email !== previousAllValues.email){
      return allValues.email;
    }
  return value
}
const getSendPhone = (value, previousValue, allValues, previousAllValues) => {
  if(allValues.showvalue){
    const number = new Phone(allValues.showvalue);
    if(number && _.size(number) > 0){
      return _.head(number)
    }
  }
}



export default formReducer.normalize({
  register: {
    first_name: normalizeFirstName,
    last_name: normalizeLastName,
    password: normalizePassword,
    phone_prefix: normalizePhonePrefix,
    country: normalizeCountry,
    phone_number: normalizePhone
  },
  profile:{
    first_name: normalizeFirstName,
    last_name: normalizeLastName
  },
  send: {
    showvalue: normalizeSendValue,
    phone: getSendPhone
  }
})
