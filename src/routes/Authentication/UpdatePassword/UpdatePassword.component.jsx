import {PasswordForm} from "../../../components/PasswordForm/PasswordForm.component";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

export const UpdatePassword = () => {
    const {user} = useSelector(state => ({...state}));
    const [userName, setUserName] = useState("");
    useEffect(() => {
        try {
            if (user) {
                const name = user.displayName;
                setUserName(name);
            }
        } catch (error) {
            console.log("Updade Password: error in fetching user");
            console.log(error);
        }
    }, [user]);

    return (
        <div className="container mt-lg-6 p-5">
            <div className="row">
                <div className="col-md-7 offset-md-3">
                    <h2>Update your password</h2>
                    <p>{`Set up a new password for ${userName}'s account!`}</p>
                    <div className="mt-5">
                        <PasswordForm />
                    </div>
                </div>
            </div>
        </div>
    );
};