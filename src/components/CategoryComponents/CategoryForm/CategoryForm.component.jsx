import { Form } from "antd";
import {InfoCircleOutlined,  FolderAddOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {
    createCategory,
    fetchAndStoreCategoriesInRedux,
    getCategoriesList
} from "../../../utils/category/category.utils";
import {useDispatch} from "react-redux";
import PrimaryButton from "../../PrimatyButton/PrimaryButton.component";
import BasicInput from "../../FormComponents/BasicInput/BasicInput.component";
import BasicDivider from "../../BasicDivider/BasicDivider.component";

const CategoryForm = () => {
    const [form] = Form.useForm();
    const {user} = useSelector(state => ({...state}));
    const dispatch = useDispatch();

    const categoryInputProps = {
        label: "Category name",
        name: "category",
        type: "text",
        placeholder: "Input a new category here",
        isRequired: true,
        tooltip: {
            title: 'Create a new category by passing a name',
            icon: <InfoCircleOutlined/>,
        }
    }

    let handleSubmitForm = async (values) => {
        const {category} = values;
        if (category.length < 5) {
            toast.error("Error: name too short!");
            return;
        }
        createCategory(user.accessToken, category).then(
            () => {
                fetchAndStoreCategoriesInRedux(dispatch);
                toast.success(`Category ${category} created successfully`);
            }
        ).catch(e => toast.error("Error, please try again"));
    };

    return (
        <>
            <BasicDivider titleHeader="Create Category"/>
            <Form
                onFinish={handleSubmitForm}
                form={form}
                layout="vertical"
                size={"large"}
                required
            >
                <BasicInput
                props={categoryInputProps}/>
                <PrimaryButton
                    type="primary"
                    htmlType={"submit"}
                    innerText={"Create Category"}
                    icon={<FolderAddOutlined />} />
            </Form>
        </>
    );
};

export default CategoryForm;