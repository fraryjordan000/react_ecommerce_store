import { combineReducers } from 'redux';

import products from './products';
import categories from './categories';
import tickets from './tickets';
import active from './active';
import change from './change';
import filter from './filter';

const allReducers = combineReducers({
    products: products,
    categories: categories,
    tickets: tickets,
    active: active,
    change: change,
    filter: filter
});

export default allReducers;