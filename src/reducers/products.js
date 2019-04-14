
export default function(state = [], action) {
    switch(action.type) {
        case 'ADD_TO_CART':
            for(let i in state) {
                if(state[i].id === action.payload) {
                    state[i].inCart = true;
                    break;
                }
            }
            return state;
        case 'REMOVE_FROM_CART':
            for(let i in state) {
                if(state[i].id === action.payload) {
                    state[i].inCart = false;
                    break;
                }
            }
            return state;
        case 'CLEAR_CART':
            for(let i in state) {
                if(state[i].inCart) state[i].inCart = false;
            }
            return state;
        case 'UPDATE_PRODUCTS':
            return action.payload;
        case 'FILTER_PRODUCTS':
            if(action.payload === 'none') {
                for(let i in state) {
                    state[i].visible = true;
                }
                return state;
            }
            for(let i in state) {
                if(state[i].category === action.payload) {
                    state[i].visible = true;
                } else {
                    state[i].visible = false;
                }
            }
            return state;
        default:
            return state;
    }
}