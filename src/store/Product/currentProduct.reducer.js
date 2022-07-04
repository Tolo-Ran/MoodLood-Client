export const currentProductReducer = (state = null, action) => {
    switch (action.type) {
        case 'GET_CURRENT_PRODUCT':
            return action.payload;
        case 'LOGGED_OUT':
            return action.payload;
        default:
            return state;
    }
}