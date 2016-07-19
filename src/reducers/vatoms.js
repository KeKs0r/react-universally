import { VATOMS_LOAD, VATOM_DELETE, VATOM_LOAD, AUTH} from '../constants';
import _ from 'lodash';
import { Vatom } from 'vatomic-web-sdk';


const initialState = {
  data: [],
  inventoryFetched: false
}

const _getResource = (resources, name) => {
  return _.result(_.find(resources, {name: name}), 'value.value');
}

const createVatom = function(item){
  const vatom = new Vatom(item);
  vatom.checkIsOwned = function(vatom){return true;};
  vatom.checkVariationIsOwned = function(vatom){return true;}
  return vatom;
}


export default function vatoms(state = initialState, action) {
  switch (action.type) {
    case VATOMS_LOAD.SUCCESS:
      var data = action.payload.payload;
      var items = _.map(data, item => {
          return createVatom(item);
      });
      return Object.assign({}, state, {
        inventoryFetched: true,
        data: items
      });
      case VATOM_LOAD.SUCCESS:
        var data = action.payload.payload;

        var newVatom = createVatom(data);
        var keyed = _.keyBy(state.data, 'identifier');
        keyed[newVatom.identifier] = newVatom
        return Object.assign({}, state, {
          data: _.values(keyed)});
    case AUTH.LOGOUT_SUCCESS:
      return initialState;
    // WORAROUND EMPTY INVENTORY
    case 'FAILURE':
      if(_.get(action, 'payload.response.error') === 1029){
        return Object.assign({}, state,{
          data:[]
        });
      }
      return state;
    case VATOM_DELETE.SUCCESS:
      const { vatom } = action;
      return Object.assign({}, state, {
        data: _.map(state.data, (v) => {
          if(v.identifier !== vatom){
            return v
          }
          v.deleted = true;
          return v;
      })
    });
    default: return state;
  }
}
