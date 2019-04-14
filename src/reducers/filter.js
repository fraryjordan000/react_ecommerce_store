
export default function(state = 'none', action) {
    switch(action.type) {
        case 'FILTER_PRODUCTS':
            return action.payload;
        default:
            return state;
    }
}