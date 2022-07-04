import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import BasicDivider from "../../BasicDivider/BasicDivider.component";
import BasicTable from "../../BasicTable/BasicTable.component";
import {selectRowFeature} from "../../BasicTable/selectRow.feature";
import {componentsForEditableCell, configureEditableColumns} from "../../BasicTable/editRow.feature";
import {getDeletableRowConfig} from "../../BasicTable/deleteRow.feature";
import {getColumnSearchProps} from "../../BasicTable/searchRow.feature";
import {useRef} from 'react';
import PrimaryButton from "../../PrimatyButton/PrimaryButton.component";
import {
    fetchAndStoreCategoriesInRedux,
    getCategoriesNames,
    removeCategory, updateCategory
} from "../../../utils/category/category.utils";
import {toast} from "react-toastify";

const CategoriesTable = () => {
    const [categoriesNames, setCategoriesNames] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const dispatch = useDispatch();
    const searchInput = useRef(null);
    const {categories, user} = useSelector(state => ({...state}));
    const handleDelete = (key) => {
        const slug = categories.list[key].slug;
        const category = categories.list[key].name;
        removeCategory(slug, user.accessToken)
            .then(() => {
                fetchAndStoreCategoriesInRedux(dispatch);
                toast.success(`${category} has been deleted`);
            })
            .catch((e) => toast.error("Error, please try again."));
    };
    const setToTableDataSourceStructure = (categoriesNames) => {
        if (categoriesNames) {
            const data = [];
            for (let i = 0; i < categoriesNames.length; i++) {
                data.push({
                    key: i,
                    category: categoriesNames[i]
                })
            }
            return data;
        }
    };
    useEffect(() => {
        if (categories) {
            setCategoriesNames(setToTableDataSourceStructure(getCategoriesNames(categories.list)));
        }
    }, [categories]);
    const handleSave = (row) => {
        const {key, category} = row;
        const newData = [...categoriesNames];
        const index = newData.findIndex((item) => key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {...item, ...row});
        const slug = categories.list[key].slug;
        updateCategory(slug, user.accessToken, category)
            .then(r => {
                fetchAndStoreCategoriesInRedux(dispatch);
                toast.success("Category changed successfully");
            })
            .catch(e => toast.error(e.message));

    };
    const defaultColumns = [
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            width: '90%',
            editable: true,
            ...getColumnSearchProps(
                'category',
                searchText,
                setSearchText,
                searchedColumn,
                setSearchedColumn,
                searchInput),
        },
        getDeletableRowConfig(categoriesNames, handleDelete)
    ];
    const onRowSelection = (selectedRowKeys, selectedRows) => {
        setSelectedRows(selectedRows);
    }
    const categoryTableProps = {
        dataSource: categoriesNames,
        rowSelection: selectRowFeature("checkbox", onRowSelection),
        columns: configureEditableColumns(defaultColumns, handleSave),
        components: componentsForEditableCell,
        rowClassName: 'editable-row',
    }

    return (
        <div>
            <BasicDivider titleHeader={`Categories List (${categoriesNames.length})`}/>
            <PrimaryButton type="danger" innerText={"Delete Selected Categories"} htmlType={"button"}/>
            <BasicTable
                props={categoryTableProps}/>
        </div>
    );
};

export default CategoriesTable;
