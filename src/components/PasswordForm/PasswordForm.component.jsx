import {Button, Form, Input} from "antd";
import {auth} from "../../utils/firebase/firebase";
import {toast} from "react-toastify";
import {
    signOut,
    updatePassword,
} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {useState, useEffect, lazy} from "react";
import Loading from "../loading/Loading.component"
import {useDispatch, useSelector} from "react-redux";
import {passwordValidator, protectRoute} from "../../utils/auth/auth.utils";

export const PasswordForm = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state => ({...state}));

    const handleSubmitForm = (values) => {
        setLoading(true);
        const {password} = values;

        if (!passwordValidator(password)) {
            toast.warn("Password must be at least eight (8) characters, with one (1) lower- and one (1) uppercase letter and one (1) special character");
            return;
        }

        /*conplete sign up with email link*/
        console.log("user selectopr")
        console.log(user);

        updatePassword(auth.currentUser, password)
            .then(() => {
                toast.success("Password has been updated successfully.");
                signOut(auth).then(r => {
                    dispatch(
                        {
                            type: 'LOGGED_OUT',
                            payload: null
                        }
                    )
                    navigate("/sign-in");
                });
            }).catch((error) => {
            console.log("error occurred while updating password");
            console.log(error);
        });
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
                            Confirm
                        </Button>

                    </Form.Item>
                </Form>}
        </>
    );
};