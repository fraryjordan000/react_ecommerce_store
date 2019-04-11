import { combineReducers } from 'redux';

import { api } from './api';
import { cart } from './cart';

const allReducers = combineReducers({
    api: api,
    cart: cart
});

export default allReducers;