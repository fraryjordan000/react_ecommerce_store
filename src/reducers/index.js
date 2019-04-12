import { combineReducers } from 'redux';

import products from './products';
import categories from './categories';
import tickets from './tickets';

const allReducers = combineReducers({
    products: products,
    categories: categories,
    tickets: tickets
});

export default allReducers;