import SignInForm from "../../../components/SignInForm/SignInForm.component";
export const SignInAsAdmin = () => {

    return (
        <div className="container mt-lg-6 p-5">
            <div className="row">
                <div className="col-md-7 offset-md-3">
                    <h2>Sign into your MoodLood admin account</h2>
                    <p>Sign in as admin with your email and password; or directly with your Google account!</p>
                    <div className="mt-5">
                        <SignInForm isSubscriber={false}/>
                    </div>

                </div>


            </div>

        </div>
    );
};