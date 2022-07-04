export const subcategoriesReducer = (state = null, action) => {
    switch (action.type) {
        case 'GET_SUBCATEGORY_LIST':
            return action.payload;
        case 'LOGGED_OUT':
            return action.payload;
        default:
            return state;
    }
}