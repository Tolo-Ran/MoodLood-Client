import { Button, Form, Input } from 'antd';
import {toast, ToastContainer} from "react-toastify";
import {sendPasswordResetEmail} from "firebase/auth";
import {auth, googleAuthProvider} from "../../../utils/firebase/firebase";
import "react-toastify/dist/ReactToastify.css"
import {GoogleOutlined, MailOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {protectRoute} from "../../../utils/auth/auth.utils";



const ResetPasswordForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        protectRoute(user, navigate);
    }, [user]);

    const handleSubmitForm = (values) => {
        const {email, confirmEmail} = values;

        if (email !== confirmEmail) {
            toast.error("Emails do not match");
        }

        const actionCodeSettings = {
            url: process.env.REACT_APP_RESET_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true
        };

        sendPasswordResetEmail(auth,
            email, actionCodeSettings)
            .then(function () {
                toast.success("Please check your email. We sent you a reset password link.")
            })
            .catch(function (error) {
                toast.error(error);
            });

    };

    return (
        <Form
            form={form}
            onFinish={handleSubmitForm}
            autoComplete="on"
        >
            <Form.Item
                label="Email"
                name="email"
                type="email"
                autoComplete="on"
                required={true}
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
                label="Confirm email"
                name="confirmEmail"
                type="email"
                autoComplete="on"
                required={true}
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
                    shape={"round"}
                    icon={<MailOutlined />}
                    type="primary"
                    htmlType="submit">
                    Reset password
                </Button>

            </Form.Item>
        </Form>
    );
};

export const ResetPassword = () => {
    return (
        <div className="container mt-lg-6 p-5">
            <div className="row">
                <div className="col-md-7 offset-md-3">
                    <h2>Reset your password</h2>
                    <p>We will send a link to your email address.</p>
                    <div className="mt-5">
                        <ResetPasswordForm />
                        <ToastContainer />
                    </div>

                </div>
            </div>
        </div>
    );
};
