import { UI, VATOM_SEND } from '../constants';
//import { TRANSITIONS } from '../transitions';


const initialState = {
    category_drawer: false,
    send_confirmation: false,
    contacts_open: false,
    sorting: UI.SORTING.MOST_RECENT,
    search_active: true,
  //  card_animation: TRANSITIONS.custom
}

export default function ui(state = initialState, action) {
    switch (action.type) {
        case UI.CATEGORY_DRAWER:
            return  {
                ...state,
                category_drawer: !state.category_drawer
            };
        case VATOM_SEND.SUCCESS:
            return Object.assign({}, state, {
                send_confirmation: true
            });
        case UI.SEND.HIDE_CONFIRMATION:
            return Object.assign({}, state, {
                send_confirmation: false
            });
        case UI.SEND.SHOW_CONTACTS_VIEW:
            return  {
                ...state,
                contacts_open: false
            };
        case UI.SORTING.CHANGE_SORTING:
            return  {
                ...state,
                sorting: action.sorting
            };
        case UI.SEARCH:
            return  {
                ...state,
                search_active: !state.search_active
            };
        case UI.ACTIVECARD_TRANSITION:
            return  {
                ...state,
                card_animation: action.animation
            };
        default:
            return state;
    }
}
