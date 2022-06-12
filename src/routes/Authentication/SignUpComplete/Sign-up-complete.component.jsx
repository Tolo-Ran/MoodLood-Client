import {Button, Form, Input} from "antd";
import {auth} from "../../../utils/firebase/firebase";
import {toast, ToastContainer} from "react-toastify";
import {
    isSignInWithEmailLink,
    signOut,
    createUserWithEmailAndPassword
    , updateProfile
} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {useState} from "react";
import Loading from "../../../components/loading/Loading.component"

const CompleteRegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const passwordValidator = (password) => {
        /*At least 8 chars
        * 1 Lowercase
        * 1 uppercase
        * 1 special char
        * */
        return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(password);
    };

    const handleSubmitForm = async (values) => {
        setLoading(true);
        const {password, email, lastName, firstName} = values;

        if (!passwordValidator(password)) {
            toast.warn("Password must be at least eight (8) characters, with one (1) lower- and one (1) uppercase letter and one (1) special character");
            return;
        }

        if (isSignInWithEmailLink(auth, window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    updateProfile(auth.currentUser, {
                        displayName: `${firstName} ${lastName}`,
                    }).catch((error) => {
                        console.log(error);
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error("Error, please try again!");
                });
        }

        signOut(auth).then(() => {
            navigate("/sign-in");
        }).catch((error) => {
            toast.error(error.message);
        });
    };


    return (
        <>
            {loading? <Loading /> :
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