
export function api(state = [], action) {
    switch(action.type) {
        case 'UPDATE_API':
            return action.payload;
        default:
            return state;
    }
}