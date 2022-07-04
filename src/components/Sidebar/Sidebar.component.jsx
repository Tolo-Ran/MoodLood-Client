import { Menu } from 'antd';
import React, {useEffect, useState} from 'react';
import {
    AppstoreOutlined,
    UserOutlined,
    UserAddOutlined,
    LogoutOutlined,
    LaptopOutlined,
    NotificationOutlined
} from "@ant-design/icons";
import {NavLink,
    useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";


const Sidebar = ( ) => {
    let dispatch = useDispatch();
    let {user} = useSelector((state) => ({...state}));

    return <>
        <Menu
            mode="inline"
            defaultSelectedKeys={"Dashboard"}
            defaultOpenKeys={"Dashboard"}
            style={{
                height: '100%',
                borderRight: 0,
            }}
        >
            <Menu.Item
                hidden={!(user && user.accessToken)}
                key="Dashboard">
                <span>Dashboard</span>
                <NavLink to="/admin/dashboard"/>
            </Menu.Item>
            <Menu.Item
                hidden={!(user && user.accessToken)}
                key="Categories">
                <span>Categories</span>
                <NavLink to="/admin/categories"/>
            </Menu.Item>
            <Menu.Item
                hidden={!(user && user.accessToken)}
                key="Subcategories">
                <span>Subcategories</span>
                <NavLink to="/admin/subcategories"/>
            </Menu.Item>
            <Menu.Item
                hidden={!(user && user.accessToken)}
                key="Products">
                <span>Products</span>
                <NavLink to="/admin/products"/>
            </Menu.Item>
        </Menu>
    </>;

};

export default Sidebar;

/*    const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
        const key = String(index + 1);
        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `Categories ${key}`,
            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        };
    });*/