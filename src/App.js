import {useEffect} from "react";
import 'antd/dist/antd.min.css';
import './App.css';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import {Home} from "./routes/Home/Home.component";
import {SignIn} from "./routes/Authentication/SignIn/Sign-in.component";
import {SignUp} from "./routes/Authentication/SignUp/Sign-up.component"
import {SignUpComplete} from "./routes/Authentication/SignUpComplete/Sign-up-complete.component";
import {auth} from "./utils/firebase/firebase";
import {useDispatch, useSelector} from "react-redux";
import {ResetPassword} from "./routes/Authentication/reset-password/ResetPassword.component";
import {SetUpNewPassword} from "./routes/Authentication/reset-password/SetUpNewPassword.component";
import {
    ProtectedRoute,
    getCurrentUser} from "./utils/auth/auth.utils";
import {SignUpCompleteGoogle} from "./routes/Authentication/SignUpComplete/sign-up-complete-with-google.component";
import {UserHistory} from "./routes/UserHistory/UserHistory.component";
import {UpdatePassword} from "./routes/Authentication/UpdatePassword/UpdatePassword.component"
import {dispatchUserInfo} from "./utils/redux/userDispatch.utils";
import {SignInAsAdmin} from "./routes/Authentication/SignInAdmin/Sign-in-admin.component";
import {AdminDashboard} from "./routes/AdminDashboard/AdminDashboard.component";
import AdminCategories from "./routes/AdminCategories/AdminCategories.component";
import BaseLayout from "./routes/BaseLayout/BaseLayout.component";
import AdminSubcategories from "./routes/AdminSubcategories/AdminSubcategories.component";
import AdminProducts from "./routes/AdminProducts/AdminProducts.component";

function App() {
    const dispatch = useDispatch();
    const {user} = useSelector(state => ({...state}));
    //Check firebase auth state
    useEffect(() => {
        // onAuthStateChanged return a user back
        const unsubscribe = auth.onAuthStateChanged(
            (user) => {
                if (user) {
                    getCurrentUser(user.accessToken).then(res => {
                        dispatchUserInfo(res, dispatch);
                    });
                }
            })
        //Clean up
        return () => unsubscribe();
    }, []);

    return (

        <BrowserRouter>

            <Routes>
                <Route exact path="/" element={<BaseLayout />}>
                    <Route index element={<Home/>}/>
                    <Route path="user">

                        <Route path="history" element={
                            <ProtectedRoute user={user}>
                                <UserHistory/>
                            </ProtectedRoute>}/>
                        <Route path="update-password" element={
                            <ProtectedRoute user={user}>
                                <UpdatePassword/>}/>
                            </ProtectedRoute>}/>
                    </Route>
                    <Route path={"/admin"}>
                        <Route path={"dashboard"} element={
                            <ProtectedRoute user={user}>
                                <AdminDashboard/>
                            </ProtectedRoute>}/>
                        } />
                        <Route path={"categories"} element={
                            <ProtectedRoute user={user}>
                                <AdminCategories/>
                            </ProtectedRoute>}/>
                        } />
                        <Route path={"subcategories"} element={
                            <ProtectedRoute user={user}>
                                <AdminSubcategories/>
                            </ProtectedRoute>}/>
                        } />

                        <Route path={"products"} element={
                            <ProtectedRoute user={user}>
                                <AdminProducts/>
                            </ProtectedRoute>}/>
                        } />
                    </Route>

                    <Route path="sign-in" element={<SignIn/>}/>
                    <Route path="admin/sign-in" element={<SignInAsAdmin/>}/>
                    <Route path="sign-in/forgot-password" element={<ResetPassword/>}/>
                    <Route path="sign-in/forgot-password/new-password" element={<SetUpNewPassword/>}/>
                    <Route path="sign-up" element={<SignUp/>}/>
                    <Route path="sign-up/complete" element={<SignUpComplete/>}/>
                    <Route path="sign-up/complete-google" element={<SignUpCompleteGoogle/>}/>
                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default App;
