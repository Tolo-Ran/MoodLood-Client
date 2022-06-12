import { Menu } from 'antd';
import React, {useEffect, useState} from 'react';
import { AppstoreOutlined, UserOutlined, UserAddOutlined, LogoutOutlined } from "@ant-design/icons";
import {Link, Outlet} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {signOut, onAuthStateChanged} from "firebase/auth";
import {auth} from "../../utils/firebase/firebase";
import {onStateChange} from "firebase/auth";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Navigation = () => {
  let dispatch = useDispatch();
  let {user} = useSelector((state) => ({...state}));
  let [userName, setUserName] = useState("User");
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const dName = user.displayName.split(" ")[0];
      setUserName(dName);
    }
  });


  let handleLogOut = () => {
      signOut(auth).then(r => dispatch(
          {
            type: 'LOGGED_OUT',
            payload: null
          }
      ));
  };

  useEffect(() => {
    user === null && navigate("/sign-in");
  }, [user])


  return <>
    <ToastContainer></ToastContainer>
    <Menu mode="horizontal"
          theme={"dark"}>
      {/*Logo*/}
      <Menu.Item
          path="/"
          icon={<AppstoreOutlined/>}
          key="MoodLood">
        <span>MoodLood</span>
        <Link to="/"/>
      </Menu.Item>

      {/* Home */}
      <Menu.Item
          path="/"
          icon={<AppstoreOutlined/>}
          key={"Home"}
          className={"ms-auto"}>
        <span>Home</span>
        <Link to="/"/>
      </Menu.Item>

      {/*Sign in*/}
      <Menu.Item
          hidden={user !== null}
          path="/sign-in"
          icon={<UserOutlined/>}
          key={"Sign in"}>
        <span>Sign in</span>
        <Link to="/sign-in"/>
      </Menu.Item>

      {/*Sign up*/}
      <Menu.Item
          hidden={user !== null}
          path="/sign-up"
          icon={<UserAddOutlined/>}
          key={"Sign up"}>
        <span>Sign up</span>
        <Link to="/sign-up"/>
      </Menu.Item>

      {/*Sign out*/}
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


        <Menu.Item key="My profil">{"My profil"}</Menu.Item>
        <Menu.Item key={"Shopping"}>Shopping</Menu.Item>
        <Menu.Item key={"Settings"}>Settings</Menu.Item>
      </Menu.SubMenu>
    </Menu>
    <Outlet/>
  </>;

};

export default Navigation;