import axios from "axios";
import Resizer from "react-image-file-resizer";

export let getProductsList = async (count) => {
    return await axios.get(`${process.env.REACT_APP_API}/product/${count}`);
};
export let getProduct = (slug) => {
    return axios.get(`${process.env.REACT_APP_API}/product/${slug}`)
        .catch(e => console.log(e));
}
export let createProduct = async (authtoken, product) => {
    console.log("function Product create")
    console.log(product);

    return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
        headers: {
            authtoken
        }
    }).then(res => console.log(res))
        .catch(e => console.log(e));
};

export let updateProduct = async (slug, authtoken, product) => {
    await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product,{
        headers: {
            authtoken
        }
    })
        .catch(e => console.log(e));
}
export let removeProduct = async (slug, authtoken) => {
    await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
        headers: {
            authtoken
        }
    })
        .catch(e => console.log(e));
}

export const resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            720,
            720,
            "JPEG",
            100,
            0,
            (uri) => {
                resolve(uri);
            },
            "base64"
        );
    });

export const removeImageFromCloudinary = (public_id, authtoken) => {
    axios.post(`${process.env.REACT_APP_API}/image-remove`, {public_id}
        , {
            headers: {
                authtoken
            }

        }).then(r => console.log("images removed"));
}

export const fetchAndStoreProductsInRedux = (dispatch) => {
    getProductsList(10).then(res => {
        dispatch({
            type: 'GET_PRODUCTS_LIST',
            payload: {
                list: res.data
            },
        });
    });

}


