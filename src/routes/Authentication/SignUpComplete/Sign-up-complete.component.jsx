import {Button, Form, Input} from "antd";
import {auth} from "../../../utils/firebase/firebase";
import {toast, ToastContainer} from "react-toastify";
import {
    isSignInWithEmailLink,
    signOut,
    updatePassword,
    signInWithEmailLink,
    updateProfile
} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from "react";
import Loading from "../../../components/Loading/Loading.component"
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    createOrUpdateUser,
    protectRoute,
    passwordValidator
} from "../../../utils/auth/auth.utils";


const CompleteRegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state => ({...state}));

    useEffect(() => {
        protectRoute(user, navigate);
    }, [user]);

    const handleSubmitForm = (values) => {
        setLoading(true);
        const {password, email, lastName, firstName} = values;

        if (!passwordValidator(password)) {
            toast.warn("Password must be at least eight (8) characters, with one (1) lower- and one (1) uppercase letter and one (1) special character");
            return;
        }

        /*conplete sign up with email link*/
        if (isSignInWithEmailLink(auth, window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }

            signInWithEmailLink(auth, email, window.location.href)
                .then(async (result) => {
                    window.localStorage.removeItem('emailForSignIn');

                    updatePassword(result.user, password)
                        .then((

                        ) => {
                            console.log("password updated successfully");
                            updateProfile(result.user, {
                                displayName: `${firstName} ${lastName}`,
                            })
                                .then(() => {
                                    console.log("Display name updated successfully");
                                    console.log("New user");
                                    console.log(result.user);
                                    createOrUpdateUser(result.user.accessToken, result.user.displayName);
                                })
                                .catch((error) => {
                                    console.log("error occurred while updateProfile");
                                    console.log(error);
                                });
                        }).catch((error) => {
                        console.log("error occurred while updating password");
                        console.log(error);
                    });

                    signOut(auth).then(r => {
                        dispatch(
                            {
                                type: 'LOGGED_OUT',
                                payload: null
                            }
                        )
                        navigate("/sign-in");
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };



    return (
        <>
            {loading ? <Loading/> :
                <Form
                    form={form}
                    onFinish={handleSubmitForm}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        initialValue={localStorage.getItem('emailForSignIn')}
                        type="email"
                    >
                        <Input
                            disabled={true}/>
                    </Form.Item>

                    <Form.Item
                        label="First Name"
                        name="firstName"
                        type="name"
                        required={true}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        type="lastName"
                        required={true}
                    >
                        <Input/>
                    </Form.Item>

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

                    <Form.Item>
                        <Button
                            shape={"round"}
                            type="primary"
                            htmlType="submit">
                            Sign up
                        </Button>

                    </Form.Item>
                </Form>}
        </>
    );
};

export const SignUpComplete = () => {

    return (
        <div id="sign-up-confirm-container" className="container mt-lg-6 p-5">
            <div className="row">
                <div className="col-md-7 offset-md-3">
                    <h2>Thank you for signing up!</h2>
                    <p>Set up a new password to complete your registration.</p>
                    <div className="mt-5">
                        <CompleteRegisterForm />
                        <ToastContainer />
                    </div>

                </div>


            </div>

        </div>
    );
};