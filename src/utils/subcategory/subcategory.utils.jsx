import axios from "axios";

export let getSubcategoriesList = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/subcategory`);
};
export let getSubcategoriesListFromCategoryId = async (parent) => {
    return await axios.get(`${process.env.REACT_APP_API}/subcategory/${parent}`);
};
export let getSubcategory = (slug) => {
    return axios.get(`${process.env.REACT_APP_API}/subcategory/${slug}`)
        .catch(e => console.log(e));
}
export let createSubcategory = async (authtoken, name, parent, category) => {
    return await axios.post(`${process.env.REACT_APP_API}/subcategory`, {
        name,
        parent,
        category
    }, {
        headers: {
            authtoken
        }
    })
        .catch(e => console.log(e));
};
export let updateSubcategory = async (slug, authtoken, name, category, parent) => {
    await axios.put(`${process.env.REACT_APP_API}/subcategory/${slug}`, {
        name,
        category,
        parent
    },{
        headers: {
            authtoken
        }
    })
        .catch(e => console.log(e));
}
export let removeSubcategory = async (slug, authtoken) => {
    await axios.delete(`${process.env.REACT_APP_API}/subcategory/${slug}`, {
        headers: {
            authtoken
        }
    })
        .catch(e => console.log(e));
}

export const fetchAndStoreSubcategoriesInRedux = (dispatch) => {
    getSubcategoriesList().then(res => {
        const {data} = res;
        dispatch({
            type: "GET_SUBCATEGORY_LIST",
            payload: {
                list: data
            }
        })
    });
};
export const findSubcategoryId = (subcategoryName, subcategories) => {
    if (subcategories) {
        const matcher = subcategories.find(subcategory => subcategory.name === subcategoryName);
        const id = matcher._id;
        return id;
    }
}