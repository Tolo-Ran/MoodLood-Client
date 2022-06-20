export const dispatchCategoryList = (categories, dispatch) => {

    dispatch({
        type: 'GET_CATEGORY_LIST',
        payload: {
            categories
        }
    });
};