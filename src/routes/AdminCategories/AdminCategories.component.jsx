import {Breadcrumb, Button, Divider, List, Typography} from 'antd';
import {useEffect, useState} from "react";
import {getCategoriesList} from "../../utils/category/category.utils";
import CategoryForm from "../../components/CategoryForm/CategoryForm.component";
import {useDispatch, useSelector} from "react-redux";
import {FolderAddOutlined} from "@ant-design/icons";
import CategoriesTable from "../../components/CategoryTable/CategoriesTable.component";


export const AdminCategories = () => {
    const dispatch = useDispatch();
    const {categories} = useSelector(state => ({...state}));
    useEffect(() => {
        getCategoriesList().then(res => {
            const {data} = res;
            const names = [];
            console.log(names);
            data.forEach(category => names.push(category.name));
            dispatch({
                type: "GET_CATEGORY_LIST",
                payload: {
                    list: names
                }
            })
        });
    }, []);


    return (
        <>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Admin</Breadcrumb.Item>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item>Categories</Breadcrumb.Item>
            </Breadcrumb>
            <CategoryForm/>
            <CategoriesTable/>
        </>
    );

};

export default AdminCategories

