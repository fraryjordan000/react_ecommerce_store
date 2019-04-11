export const addToCart = (product) => {
    return {
        type: 'ADD_TO_CART',
        payload: product
    }
}

export const updateAPI = (arr) => {
    return {
        type: 'UPDATE_API',
        payload: arr
    }
}