import { Button, Form, Input } from 'antd';
import {toast, ToastContainer} from "react-toastify";
import {GoogleAuthProvider, sendSignInLinkToEmail, signInWithPopup} from "firebase/auth";
import {auth, googleAuthProvider} from "../../../utils/firebase/firebase";
import "react-toastify/dist/ReactToastify.css"
import {GoogleOutlined, MailOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";


const RegisterForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmitForm = (values) => {
        const {email} = values;

        const actionCodeSettings = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            // This must be true.
            handleCodeInApp: true,
        };
        sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
                window.localStorage.setItem('emailForSignIn', email);
                toast.success(`Email sent to ${email}. Click on the link to complete your registration.`)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(`Error! Please try again.`);
            });
        form.resetFields();
    };

    function handleSignUpWithGoogleAccount() {

        signInWithPopup(auth, googleAuthProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                navigate("/sign-up/complete");
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);

        })

    }

    return (
        <Form
            form={form}
            onFinish={handleSubmitForm}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                type="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email address!',
                    },
                    {
                        type: "email",
                        message: "Please input a valid email address!"
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
            >
                <Button
                    className={"me-3"}
                    shape={"round"}
                    icon={<MailOutlined />}
                    type="primary"
                    htmlType="submit">
                    Sign up
                </Button>

                <Button
                    style={{backgroundColor: "#DB4437"}}
                    shape={"round"}
                    type="primary"
                    icon={<GoogleOutlined />}
                    htmlType="button"
                    onClick={handleSignUpWithGoogleAccount}>
                    Google Sign up
                </Button>

            </Form.Item>
        </Form>
    );
};

export const SignUp = () => {
    return (
        <div id="sign-up-container" className="container mt-lg-6 p-5">
            <div className="row">
                <div className="col-md-7 offset-md-3">
                    <h2>Don't have an account yet?</h2>
                    <p>Sign up for free with your email address!</p>
                    <div className="mt-5">
                        <RegisterForm/>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    );
};
