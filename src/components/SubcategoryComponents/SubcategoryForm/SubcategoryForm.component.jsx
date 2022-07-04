import { Form } from 'antd';
import {useSelector} from "react-redux";
import {FolderAddOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {findCategoryId, getCategoriesList} from "../../../utils/category/category.utils";
import {useDispatch} from "react-redux";
import {
    createSubcategory,
    fetchAndStoreSubcategoriesInRedux,
    getSubcategoriesList
} from "../../../utils/subcategory/subcategory.utils";
import {toast} from "react-toastify";
import BasicInput from "../../FormComponents/BasicInput/BasicInput.component";
import PrimaryButton from "../../PrimatyButton/PrimaryButton.component";
import SelectWithSearch from "../../FormComponents/SelectWithSearch/SelectWithSearch.component";
import DividerForm from "../../BasicDivider/BasicDivider.component";
import BasicDivider from "../../BasicDivider/BasicDivider.component";

const SubcategoryForm = () => {
    const [form] = Form.useForm();
    const {categories, user} = useSelector(state => ({...state}));
    const dispatch = useDispatch();
    const [categoriesNames, setCategoriesNames] = useState([]);

    useEffect(() => {
        if (categories) {
            const data = [];
            categories.list.map((category => data.push(category.name)));
            setCategoriesNames(data);
        }
    }, [categories]);

    const subcategoryInputProps = {
        name: "subcategory",
        label: "Subcategory",
        isRequired: true
    }

    const categorySelectInputProps = {
        name: "category",
        label: "Category",
        isRequired: true,
        data: categoriesNames,
        placeholder: "Select a category",
        allowClear: true,
    }

    const onFinish = (values) => {
        const {category, subcategory} = values;
        const categoryId = findCategoryId(category, categories.list);
        createSubcategory(user.accessToken, subcategory, categoryId, category)
            .then(() => {
                fetchAndStoreSubcategoriesInRedux(dispatch);
                toast.success("Subcategory created");
            })
            .catch(e => toast.error(e.message));
    };

    return (
        <>
            <BasicDivider titleHeader="Create Subcategory"/>
            <Form
                layout="vertical"
                form={form}
                name="control-hooks"
                onFinish={onFinish}>
                <BasicInput
                    props={subcategoryInputProps}/>
                <SelectWithSearch
                    props={categorySelectInputProps}
                />
                <PrimaryButton
                    type="primary"
                    htmlType={"submit"}
                    innerText="Create Subcategory"
                    icon={<FolderAddOutlined/>}/>
            </Form>
        </>
    );
};

export default SubcategoryForm;