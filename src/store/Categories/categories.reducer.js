export const categoriesReducer = (state = null, action) => {
    switch (action.type) {
        case 'GET_CATEGORY_LIST':
            return action.payload;
        default:
            return state;
    }
}