export const productsReducer = (state = null, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS_LIST':
            return action.payload;
        case 'LOGGED_OUT':
            return action.payload;
        default:
            return state;
    }
}