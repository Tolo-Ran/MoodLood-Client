import { Button, Form, Input } from 'antd';
import {toast, ToastContainer} from "react-toastify";
import {GoogleAuthProvider, sendSignInLinkToEmail, signInWithPopup} from "firebase/auth";
import {auth, googleAuthProvider} from "../../../utils/firebase/firebase";
import "react-toastify/dist/ReactToastify.css"
import {CheckOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {protectRoute} from "../../../utils/auth/auth.utils";

const NewPasswordForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const {user} = useSelector(state => ({...state}));

    useEffect(() => {
        protectRoute(user, navigate);
    }, [user]);

    const passwordValidator = (password) => {
        /*At least 8 chars
        * 1 Lowercase
        * 1 uppercase
        * 1 special char
        * */
        return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(password);
    };

    const handleSubmitForm = (values) => {
        const {password, confirmPassword} = values;
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (!passwordValidator(password)) {
            toast.warn("Password must be at least eight (8) characters, with one (1) lower- and one (1) uppercase letter and one (1) special character");
            return;
        }


    };

    return (
        <Form
            form={form}
            onFinish={handleSubmitForm}
            autoComplete="off"
        >
            <Form.Item
                label="Password"
                name="password"
                type="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input password!',
                    },
                    {
                        minLength: 9,
                        message: 'Password must be at least 9 characters'
                    }
                ]}
            >
                <Input.Password visibilityToggle={true}/>
            </Form.Item>

            <Form.Item
                label="Confirm password"
                name="confirmPassword"
                type="password"
                rules={[
                    {
                        required: true,
                        message: 'Please confirm password!',
                    },

                ]}
            >
                <Input.Password visibilityToggle={true}/>
            </Form.Item>
            <Form.Item
            >
                <Button
                    className={"me-3"}
                    shape={"round"}
                    icon={<CheckOutlined/>}
                    type="primary"
                    htmlType="submit">
                    Reset Password
                </Button>

            </Form.Item>
        </Form>
    );
};

export const SetUpNewPassword = () => {

    return (
        <div id="sign-up-container" className="container mt-lg-6 p-5">
            <div className="row">
                <div className="col-md-7 offset-md-3">
                    <h2>Create new password</h2>
                    <p>Please enter a new password </p>
                    <div className="mt-5">
                        <NewPasswordForm />
                        <ToastContainer/>
                    </div>
                </div>
            </div>
        </div>
    );
};
