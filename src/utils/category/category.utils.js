import axios from "axios";
import {toast} from "react-toastify";

export let getCategoriesList = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/category`);
};
export let getCategory = (slug) => {
    return axios.get(`${process.env.REACT_APP_API}/category/${slug}`)
        .catch(e => console.log(e));
}
export let createCategory = async (authtoken, name) => {

    return await axios.post(`${process.env.REACT_APP_API}/category`, {
        name
    }, {
        headers: {
            authtoken
        }
    })
        .catch(e => toast.error(e.message));
};

export let updateCategory = async (slug, authtoken, name) => {
    await axios.put(`${process.env.REACT_APP_API}/category/${slug}`, {
        name
    },{
        headers: {
            authtoken
        }
    })
       .catch(e => console.log(e));
}
export let removeCategory = async (slug, authtoken) => {
   await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
        headers: {
            authtoken
        }
    })
       .catch(e => console.log(e));
}

export const fetchAndStoreCategoriesInRedux = (dispatch) => {
    getCategoriesList().then(res => {
        const {data} = res;
        dispatch({
            type: "GET_CATEGORY_LIST",
            payload: {
                list: data
            }
        })
    });
}
export const getCategoriesNames = (categories) => {
    const names = [];
    for (let i = 0; i < categories.length; i++) {
        names.push(categories[i].name);
    }
    return names;
};

export const findCategoryId = (categoryName, categories) => {
    if (categories) {
        const matcher = categories.find(category => category.name === categoryName);
        const id = matcher._id;
        return id;
    }
}