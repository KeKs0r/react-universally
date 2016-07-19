import { UI } from '../constants';

export function toggleCategoryDrawer() {
  return {
    type: UI.CATEGORY_DRAWER
  }
}


export function hideSendConfirmation() {
  return {
    type: UI.SEND.HIDE_CONFIRMATION
  }
}

export function revealSendContacts(){
    return {
        type: UI.SEND.REVEAL_CONTACTS_VIEW
    }
}

// Shows and Hides Inventory Grid Sorting Selector
export function sortVatoms(sorting){
    return {
        type: UI.SORTING.CHANGE_SORTING,
        sorting
    }
}

// Apply Transition to ActiveCard
export function animateActiveCard(animation){
    return {
        type: UI.ACTIVECARD_TRANSITION,
        animation
    }
}

// Shows and Hides Search in Header
export function activateSearch(){
    return {
        type: UI.SEARCH
    }
}
