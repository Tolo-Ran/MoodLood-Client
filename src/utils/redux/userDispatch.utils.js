export const dispatchUserInfo = (res, dispatch) => {
    const {data} = res;
    const {config} = res;
    dispatch({
        type: 'LOGGED_IN',
        payload: {
            id: data._id,
            displayName: data.name,
            role: data.role,
            email: data.email,
            accessToken: config.headers.authtoken,
        }
    });
};