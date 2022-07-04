import {Form, Input} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findCategoryId} from "../../../utils/category/category.utils";
import {
    findSubcategoryId,
    getSubcategoriesListFromCategoryId
} from "../../../utils/subcategory/subcategory.utils";
import CreateItemButton from "../../PrimatyButton/PrimaryButton.component";
import SelectWithSearch from "../../FormComponents/SelectWithSearch/SelectWithSearch.component";
import BasicInput from "../../FormComponents/BasicInput/BasicInput.component";
import SelectMultiple from "../../FormComponents/SelectMultiple/SelectMultiple.component";
import SelectRadio from "../../FormComponents/SelectRadio/SelectRadio.component";
import BasicInputNumber from "../../FormComponents/BasicInputNumber/BasicInputNumber.component";
import CurrencyInput from "../../FormComponents/CurrencyInput/CurrencyInput.component";
import Loading from "../../Loading/Loading.component";

import {FolderAddOutlined} from "@ant-design/icons";
import BasicDivider from "../../BasicDivider/BasicDivider.component";
import {
    brandSelectInputProps,
    categorySelectInputProps,
    colorSelectInputProps,
    subcategorySelectInputProps,
    priceInputProps,
    quantityInputProps,
    shippingSelectInputProps,
    titleInputProps,
} from "./FormInputPropsVariables";
import {createProduct, resizeFile, fetchAndStoreProductsInRedux} from "../../../utils/product/product.utils";
import UploadPictureWall from "../../FormComponents/UploadPictureWall/UploadPictureWall.component";
import axios from "axios";

const { TextArea } = Input;

const ProductForm = (
    {
        initialFormValues,
        imagesInitialFileList,
        defaultSubcategoriesList,
        isFormToDefault,
        formId
    }
) => {


    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const {categories, subcategories, user, currentProduct} = useSelector(state => ({...state}));
    const [categoriesNames, setCategoriesNames] = useState([]);
    const [subcategoriesNames, setSubcategoriesNames] = useState(defaultSubcategoriesList);
    const [fileList, setFileList] = useState(imagesInitialFileList);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (categories) {
            const data = [];
            categories.list.map(category => data.push(category.name));
            setCategoriesNames(data);
        }
    }, [categories]);
    useEffect(() => {
        if (currentProduct) {
            form.setFieldsValue(currentProduct.initialFormValues);
            setFileList(currentProduct.images);
        }
    }, [form, isFormToDefault]);
    const handleCategoryChange = (value) => {
        if (value !== undefined) {
            const id = findCategoryId(value, categories.list);
            getSubcategoriesListFromCategoryId(id)
                .then(res => {
                    const {data} = res;
                    const names = [];
                    data.map(sub => names.push(sub.name));
                    form.resetFields(["subcategories"]);
                    setSubcategoriesNames(names);
                });
        }
    };
    const onFinish = async (values) => {
        setIsLoading(true);
        const processedImages = new Array(0);
        if (!fileList) {
            return;
        }
        const files = [];
        const authtoken = user.accessToken;
        fileList.map(image => files.push(image.originFileObj));
        for (let i = 0; i < fileList.length; i++) {
            let file = files[i];
            resizeFile(file).then(image => {
                axios.post(`${process.env.REACT_APP_API}/images-upload`, {
                        image
                    }
                    , {
                        headers: {
                            authtoken
                        }
                    })
                    .then(res => {
                        processedImages.push({
                            public_id: `${res.data.public_id}`,
                            url: `${res.data.url}`,
                        });

                    })
                    .then(() => {

                        if (processedImages.length === files.length) {
                            values.images = processedImages;
                            createProduct(user.accessToken, values).then(() => {
                                fetchAndStoreProductsInRedux(dispatch);
                                setIsLoading(false);
                            });
                        }
                    })
                    .catch((e) => {
                        console.log(e)
                    });
            });
        }
        values.category = findCategoryId(values.category, categories.list);
        values.subcategory = findSubcategoryId(values.subcategory, subcategories.list);
    };

    return (
        <>
            {isLoading ? <Loading/>
                : <Form
                    id={formId}
                    layout="horizontal"
                    form={form}
                    name="ProductForm"
                    onFinish={onFinish}
                    initialValues={initialFormValues}
                >

                    <BasicInput
                        props={titleInputProps}/>

                    <SelectWithSearch
                        props={categorySelectInputProps(categoriesNames, handleCategoryChange)}
                    />

                    <SelectWithSearch
                        props={subcategorySelectInputProps(subcategoriesNames)}
                    />

                    <SelectMultiple
                        props={colorSelectInputProps}
                    />

                    <SelectWithSearch
                        props={brandSelectInputProps}
                    />

                    <CurrencyInput
                        props={priceInputProps}
                    />

                    <BasicInputNumber
                        props={quantityInputProps}
                    />

                    <SelectRadio
                        props={shippingSelectInputProps}
                    />

                    <Form.Item
                        label="Description"
                        name={"description"}>
                        <TextArea rows={4}/>
                    </Form.Item>

                    <UploadPictureWall props={
                        {
                            fileList,
                            setFileList
                        }
                    }/>
                </Form>}
        </>
    );
};

export default ProductForm;



