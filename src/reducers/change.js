
export default function(state = false, action) {
    switch(action.type) {
        case 'TRIGGER_CHANGE':
            return !state;
        default:
            return state;
    }
}