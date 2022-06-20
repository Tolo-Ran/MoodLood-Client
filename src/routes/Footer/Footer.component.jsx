import { Menu } from 'antd';
import React, {useEffect, useState} from 'react';
import { AppstoreOutlined, UserOutlined, UserAddOutlined, LogoutOutlined } from "@ant-design/icons";
import {NavLink,
    useNavigate,
    Outlet} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {signOut, onAuthStateChanged} from "firebase/auth";
import {auth} from "../../utils/firebase/firebase";
import {useDispatch, useSelector} from "react-redux";

const Footer = ( ) => {

    return <>
        <Menu mode="horizontal"
              theme={"dark"}>
            <Menu.Item
                key={"Sign up as Admin"}
                className={"ms-auto"}>
                <span>Sign up as Admin</span>
                <NavLink to="/admin/sign-in"/>
            </Menu.Item>
        </Menu>
    </>;

};

export default Footer;