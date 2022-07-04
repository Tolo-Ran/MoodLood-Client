import React, {useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import BasicDivider from "../../BasicDivider/BasicDivider.component";
import BasicTable from "../../BasicTable/BasicTable.component";
import {
    componentsForEditableCell,
    configureEditableColumns
} from "../../BasicTable/editRow.feature";
import {getColumnSearchProps} from "../../BasicTable/searchRow.feature";
import {selectRowFeature} from "../../BasicTable/selectRow.feature";
import {getDeletableRowConfig} from "../../BasicTable/deleteRow.feature";
import PrimaryButton from "../../PrimatyButton/PrimaryButton.component";
import {
    fetchAndStoreSubcategoriesInRedux,
    removeSubcategory,
    updateSubcategory
} from "../../../utils/subcategory/subcategory.utils";
import {toast} from "react-toastify";

const SubcategoriesTable = () => {
    const [subcategoriesList, setSubcategoriesList] = useState(["Sub1", "Sub2", "Sub3"]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [SelectedRows, setSelectedRows] = useState([]);
    const searchInput = useRef(null);
    const {categories, user, subcategories} = useSelector(state => ({...state}));
    const dispatch = useDispatch();

    const setToTableDataSourceStructure = (subcategories) => {
        if (subcategories) {
            const data = [];
            for (let i = 0; i < subcategories.length; i++) {
                data.push({
                    key: i,
                    subcategory: subcategories[i].name,
                    category: subcategories[i].category,
                })
            }
            return data;
        }
    };
      useEffect(() => {
          if (subcategories) {
              setSubcategoriesList(setToTableDataSourceStructure(subcategories.list));
          }
      }, [subcategories]);

    const handleDelete = (key) => {
        const slug = subcategories.list[key].slug;
        const subcategory = subcategories.list[key].name;
        removeSubcategory(slug, user.accessToken)
            .then(() => {
                fetchAndStoreSubcategoriesInRedux(dispatch);
                toast.success(`${subcategory}  deleted`);
            })
            .catch(e => {
                toast.error(e.message);
            });
    };
    const handleSave = (row) => {
        const {key, subcategory} = row;
        const newData = [...subcategoriesList];
        const index = newData.findIndex((item) => key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {...item, ...row});
        const slug = subcategories.list[key].slug;
        updateSubcategory(slug, user.accessToken, subcategory)
            .then(r => {
                fetchAndStoreSubcategoriesInRedux(dispatch);
                toast.success("Subcategory changed successfully");
            })
            .catch(e => toast.error(e.message));
    };

    const defaultColumns = [
        {
            title: 'Subcategory',
            dataIndex: 'subcategory',
            key: 'Subcategory',
            editable: true,
            ...getColumnSearchProps(
                'subcategory',
                searchText,
                setSearchText,
                searchedColumn,
                setSearchedColumn,
                searchInput),
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            ...getColumnSearchProps(
                'category',
                searchText,
                setSearchText,
                searchedColumn,
                setSearchedColumn,
                searchInput),
        },
        getDeletableRowConfig(subcategoriesList, handleDelete)
    ];
    const onRowSelection = (selectedRowKeys, selectedRows) => {
        setSelectedRows(selectedRows);
    }
    const subcategoryTableProps = {
        dataSource: subcategoriesList,
        rowSelection: selectRowFeature("checkbox", onRowSelection),
        columns: configureEditableColumns(defaultColumns, handleSave),
        components: componentsForEditableCell,
        rowClassName: 'editable-row',
    }

    return (
        <div>
            <BasicDivider titleHeader={`Subcategories List (${subcategoriesList.length})`}/>
            <PrimaryButton innerText={"Delete Selected Subcategories"} type="danger" htmlType={"button"}/>
            <BasicTable
                props={subcategoryTableProps}/>
        </div>
    );
};
export default SubcategoriesTable;
