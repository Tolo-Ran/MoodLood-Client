import {useEffect, useState} from 'react';
import { UserOutlined, UserAddOutlined, AppstoreOutlined,LogoutOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import {NavLink,
    useNavigate} from "react-router-dom";
import { ToastContainer} from "react-toastify";
import {signOut} from "firebase/auth";
import {auth} from "../../utils/firebase/firebase";
import {useDispatch, useSelector} from "react-redux";

const Navigation = ( ) => {

  let dispatch = useDispatch();
  let {user} = useSelector((state) => ({...state}));
  let [userName, setUserName] = useState("User");
  const navigate = useNavigate();

  useEffect(() => {
      if (user) {
        const dName = user.displayName.split(" ")[0];
        setUserName(dName);
      }
  }, [user])

  let handleLogOut = () => {
      signOut(auth).then(r => {
        dispatch(
            {
              type: 'LOGGED_OUT',
              payload: null
            }
        )
        navigate("/sign-in");
      });
  };

  return <>
    <ToastContainer></ToastContainer>

    <Menu mode="horizontal"
          theme={"dark"}>

      <Menu.Item
          icon={<AppstoreOutlined/>}
          key="MoodLood">
        <span>MoodLood</span>
        <NavLink to="/"/>
      </Menu.Item>


      <Menu.Item
          icon={<AppstoreOutlined/>}
          key={"Home"}
          className={"ms-auto"}>
        <span>Home</span>
        <NavLink to="/"/>

      </Menu.Item>


      <Menu.Item
          hidden={user !== null}
          icon={<UserOutlined/>}
          key={"Sign in"}>
        <span>Sign in</span>
        <NavLink to="sign-in"/>

      </Menu.Item>


      <Menu.Item
          hidden={user !== null}
          icon={<UserAddOutlined/>}
          key={"Sign up"}>
        <span>Sign up</span>
        <NavLink to="sign-up"/>

      </Menu.Item>


      <Menu.Item
          hidden={user === null}
          onClick={handleLogOut}
          icon={<LogoutOutlined/>}
          key={"Sign out"}>
        <span>Sign out</span>
      </Menu.Item>

      <Menu.SubMenu
          hidden={user === null}
          key="User"
          title={userName}>
        <Menu.Item
            disabled={true}
            key="My profil">
          {"My profil"}</Menu.Item>
        <Menu.Item
            key={"Change password"}>
          <NavLink to="/user/update-password">Change password</NavLink>
        </Menu.Item>
        <Menu.Item key={"Wishlist"}>Wishlist</Menu.Item>
      </Menu.SubMenu>
    </Menu>
    </>
};

export default Navigation;