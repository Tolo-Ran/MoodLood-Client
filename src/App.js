import {useEffect} from "react";
import './App.css';
import Navigation from "./routes/Navigation/Navigation.component";
import {Routes, Route} from "react-router-dom";
import {Home} from "./routes/Home/Home.component";
import {SignIn} from "./routes/Authentication/SignIn/Sign-in.component";
import {SignUp} from "./routes/Authentication/SignUp/Sign-up.component"
import {SignUpComplete} from "./routes/Authentication/SignUpComplete/Sign-up-complete.component";
import {auth} from "./utils/firebase/firebase";
import {useDispatch} from "react-redux";
import {ResetPassword} from "./routes/Authentication/reset-password/ResetPassword.component";
import {SetUpNewPassword} from "./routes/Authentication/reset-password/SetUpNewPassword.component";

function App() {
    const dispatch = useDispatch();
    //Check firebase auth state
    useEffect(()=> {
        // onAuthStateChanged return a user back
        const unsubscribe = auth.onAuthStateChanged(
            async(user) =>{
                if (user) {
                    const idTokenResult = (await user.getIdTokenResult()).token;
                    dispatch(
                        {
                            type: "LOGGED_IN",
                            payload: {
                                email: user.email,
                                idToken: idTokenResult
                            }
                        }
                    )
                }
            })

        //Clean up
        return () => unsubscribe();
    }, []);
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Navigation/>}>
                    <Route index element={<Home/>}/>
                    <Route path="sign-in" element={<SignIn/>}/>
                    <Route path="sign-in/forgot-password" element={<ResetPassword/>}/>
                    <Route path="/sign-in/forgot-password/new-password" element={<SetUpNewPassword/>}/>

                    <Route path="sign-up" element={<SignUp/>}/>
                    <Route path="/sign-up/complete" element={<SignUpComplete />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
