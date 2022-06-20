import {Button, Divider, Form, Input} from "antd";
import {InfoCircleOutlined, FolderAddOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import {createCategory, getCategoriesList} from "../../utils/category/category.utils";
import {useDispatch} from "react-redux";

const CategoryForm = () => {
    const {user} = useSelector(state => ({...state}));
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    let handleSubmitForm = async (values) => {
        const {category} = values;
        await createCategory(user.accessToken, category).then(
            () => {
                getCategoriesList().then(res => {
                    const {data} = res;
                    const names = [];
                    data.forEach(category => names.push(category.name));
                    dispatch({
                        type: "GET_CATEGORY_LIST",
                        payload: {
                            list: names
                        }
                    })
                });
            }
        );

        toast.success(`Category ${category} created successfully`);
    };
    return (
        <>
            <Divider orientation={"left"}>
                <h4>
                    Create new category
                </h4>
            </Divider>
            <Form
                onFinish={handleSubmitForm}
                form={form}
                layout="vertical"
                size={"large"}
                required
            >
                <Form.Item
                    label="Category name"
                    name="category"
                    type="text"
                    tooltip={{
                        title: 'Create a new category by passing a name',
                        icon: <InfoCircleOutlined />,
                    }}
                    required
                >
                    <Input placeholder="Input new category name here" />
                </Form.Item>
                <Form.Item>
                    <Button
                        shape={"round"}
                        icon={<FolderAddOutlined />}
                        className="me-3"
                        type="primary"
                        htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </>

    );
};

export default CategoryForm;