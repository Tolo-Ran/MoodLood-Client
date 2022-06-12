import { Button, Form, Input } from 'antd';
import {toast, ToastContainer} from "react-toastify";
import {sendSignInLinkToEmail} from "firebase/auth";
import {auth, googleAuthProvider} from "../../../utils/firebase/firebase";
import {signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useState, useEffect} from "react";
import Loading from "../../../components/loading/Loading.component"
import {GoogleOutlined, MailOutlined} from "@ant-design/icons";
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const SignInForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {user} = useSelector((state) => ({...state}));


    /*Avoid user to reset password when they are already loggeed in. Redirect to home*/
    useEffect(() => {
        user !== null && navigate("/");
    }, [user]);



    const handleSubmitForm = async (values) => {
        setLoading(true);
        const {email, password} = values;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                dispatch({
                    type: 'LOGGED_IN',
                    payload: {
                        displayName: user.displayName,
                        email: user.email,
                        idToken: user.getIdToken(),
                    }
                })
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
                    toast.error("Please verify your email!");
                }

            });


        setLoading(false);

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    let handleLogInWithGoogleAccount = async () => {
        signInWithPopup(auth, googleAuthProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log(token);
                // The signed-in user info.
                const user = result.user;
                dispatch({
                    type: 'LOGGED_IN',
                    payload: {
                        displayName: user.displayName,
                        email: user.email,
                        idToken: user.getIdToken(),
                    }
                })
                navigate("/");
            }).catch((error) => {
 /*           // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);*/
            toast.error("Oops there was an error! Please try again.");
        });
    };

    function handleForgotPassword() {
        navigate("/sign-in/forgot-password");
    }

    return (
        <>
            {
                loading ? <Loading/> :
                    <Form
                        form={form}
                        onFinish={handleSubmitForm}
                        onFinishFailed={onFinishFailed}
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
                            <Input.Password visibilityToggle={true}/>
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

export const SignIn = () => {


    return (
        <div className="container mt-lg-6 p-5">
            <div className="row">
                <div className="col-md-7 offset-md-3">
                    <h2>Sign into your MoodLood account</h2>
                    <p>Sign in with your email and password; or directly with your Google account!</p>
                    <div className="mt-5">
                        <SignInForm/>
                        <ToastContainer />
                    </div>

                </div>


            </div>

        </div>
    );
};