
export default function(state = {}, action) {
    switch(action.type) {
        case 'UPDATE_ACTIVE':
            return action.payload;
        default:
            return state;
    }
}