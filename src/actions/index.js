export const addToCart = (product) => {
    return {
        type: 'ADD_TO_CART',
        payload: product
    }
}

export const removeFromCart = (product) => {
    return {
        type: 'REMOVE_FROM_CART',
        payload: product
    }
}

export const clearCart = () => {
    return {
        type: 'CLEAR_CART'
    }
}

export const updateProducts = (arr) => {
    return {
        type: 'UPDATE_PRODUCTS',
        payload: arr
    }
}

export const updateCategories = (arr) => {
    return {
        type: 'UPDATE_CATEGORIES',
        payload: arr
    }
}

export const filterProducts = (str) => {
    return {
        type: 'FILTER_PRODUCTS',
        payload: str
    }
}

export const addTicket = (ticket) => {
    return {
        type: 'ADD_TICKET',
        payload: ticket
    }
}

export const updateActive = (id) => {
    return {
        type: 'UPDATE_ACTIVE',
        payload: id
    }
}

export const triggerChange = () => {
    return {
        type: 'TRIGGER_CHANGE'
    }
}