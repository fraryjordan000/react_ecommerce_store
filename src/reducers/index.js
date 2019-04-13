import { combineReducers } from 'redux';

import products from './products';
import categories from './categories';
import tickets from './tickets';
import active from './active';

const allReducers = combineReducers({
    products: products,
    categories: categories,
    tickets: tickets,
    active: active
});

export default allReducers;