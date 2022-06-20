import axios from "axios";
import {Navigate} from "react-router-dom";

export let createOrUpdateUser = (authtoken, name) => {
    return axios.post(`${process.env.REACT_APP_API}/create-or-update-user`, {}, {
        headers: {
            name,
            authtoken
        }
    })
        .then(() => console.log("user created or updated locally"))
        .catch(e => console.log(e));
}
export let getCurrentUser = (authtoken, isSubscriber) => {
    if (!isSubscriber) {
        return axios.post(`${process.env.REACT_APP_API}/current-admin`, {}, {
            headers: {
                authtoken
            }
        });
    } else if(isSubscriber) {
        return axios.post(`${process.env.REACT_APP_API}/current-user`, {}, {
            headers: {
                authtoken
            }
        }).catch(e => {
            console.log(e)
        });
    } else {
        console.log("Please verify role in function getCurrent user ")
    }

};
export let redirectRoleBased = (res, navigate) => {
    const {data} = res;

    if (data.role === "admin") {
        navigate("/admin/dashboard");
    } else {
        navigate("/user/history");
    }
};
export let protectRoute = (user, navigate) => {
    if (user !== null && user.role === "admin") {
        navigate("/admin/dashboard");
    } else if (user !== null && user.role === "subscriber") {
        navigate("/user/history");
    }
}
export const passwordValidator = (password) => {
    /*At least 8 chars
    * 1 Lowercase
    * 1 uppercase
    * 1 special char
    * */
    return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(password);
};

export const ProtectedRoute = ({ user, children }) => {
    if (!user) {
        return <Navigate to="/sign-in" replace />;
    }
    return children;
};