export const categoriesReducer = (state = null, action) => {
    switch (action.type) {
        case 'GET_CATEGORY_LIST':
            return action.payload;
        case 'GET_CATEGORIES':
            return action.payload;
        case 'LOGGED_OUT':
            return action.payload;
        default:
            return state;
    }
}