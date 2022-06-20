import axios from "axios";

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
       .catch(e => console.log(e));
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