
export default function(state = [], action) {
    switch(action.type) {
        case 'UPDATE_CATEGORIES':
            return action.payload;
        default:
            return state;
    }
}