import { Button, Form, Input } from 'antd';
import {toast, ToastContainer} from "react-toastify";
import {auth, googleAuthProvider} from "../../utils/firebase/firebase";
import {signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import Loading from "../../components/loading/Loading.component"
import {GoogleOutlined, MailOutlined} from "@ant-design/icons";
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {getCurrentUser, protectRoute, redirectRoleBased} from "../../utils/auth/auth.utils";
import {dispatchUserInfo} from "../../utils/redux/userDispatch.utils";


const SignInForm = ({isSubscriber}) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state) => ({...state}));
    const dispatch = useDispatch();

    useEffect(() => {
        protectRoute(user, navigate);
    }, [user]);

    const handleSubmitForm = async (values) => {
        setLoading(true);
        const {email, password} = values;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                getCurrentUser(user.accessToken, isSubscriber)
                    .then(res => {
                        dispatchUserInfo(res, dispatch);
                        redirectRoleBased(res, navigate);
                    })
                    .catch(e => console.log("error by reaching auth" + e));
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoading(false);
                if (errorCode === "auth/wrong-password") {
                    toast.error("Wrong password!");
                }
                if (errorCode === "auth/user-not-found") {
                    toast.error("User account not found! Please verify your email!");
                }
            });
        setLoading(false);

    };

    let handleLogInWithGoogleAccount = async () => {
        signInWithPopup(auth, googleAuthProvider)
            .then((result) => {
                getCurrentUser(result.user.accessToken, isSubscriber).then(
                    (res) => {
                        dispatchUserInfo(res, dispatch);
                        redirectRoleBased(res, navigate);
                    })
                    .catch((e) =>             toast.error("Access denied! Your account has not the admin level")
            );
            }).catch((error) => {
            toast.error(error.code);
        });
    };

    function handleForgotPassword() {
        navigate("/sign-in/forgot-password");
    }

    return (
        <>
            {
                loading ? <Loading /> :
                    <Form
                        form={form}
                        onFinish={handleSubmitForm}
                        autoComplete="on">
                        <ToastContainer></ToastContainer>
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
                            <Input/>
                        </Form.Item>
                        {/*Password*/}
                        <Form.Item
                            label="Password"
                            name="password"
                            type="password"
                            autoComplete={"on"}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                }
                            ]}
                        >
                            <Input.Password autoComplete="on" visibilityToggle={true}/>
                        </Form.Item>

                        <Form.Item
                        >
                            <Button
                                shape={"round"}
                                icon={<MailOutlined/>}
                                className="me-3"
                                type="primary"
                                htmlType="submit">
                                Sign in
                            </Button>
                            <Button
                                style={{backgroundColor: "#DB4437"}}
                                shape={"round"}
                                type="primary"
                                icon={<GoogleOutlined/>}
                                htmlType="button"
                                onClick={handleLogInWithGoogleAccount}>
                                Google Sign in
                            </Button>

                        </Form.Item>
                        <Form.Item>
                            <Button className={"float-right"} onClick={handleForgotPassword} type="link">
                                Forgot password?
                            </Button>
                        </Form.Item>
                    </Form>
            }
        </>
    );
};
export default SignInForm;