import {useSelector} from "react-redux";
import {useNavigate,Navigate} from "react-router-dom";
import SideBar from "../../components/Sidebar/Sidebar.component";

export const UserHistory = () => {
    const {user} = useSelector(state => ({...state}));
    const navigate = useNavigate();

    return (
       <SideBar />
    );
};