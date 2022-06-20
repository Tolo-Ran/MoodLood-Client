import {Button, Divider, Form, Input, Popconfirm, Table} from 'antd';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {removeCategory, updateCategory} from "../../utils/category/category.utils";
import {toast, ToastContainer} from "react-toastify";

const slugify = require("slugify");

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

const CategoriesTable = () => {
    const [dataSource, setDataSource] = useState([]);
    const {categories, user} = useSelector(state => ({...state}));
    const {list} = categories;


    useEffect(() => {
        const data = [];
        for (let i = 0; i < list.length; i++) {
            data.push({
                key: String(i),
                category: list[i],
            })
        }
        setDataSource(data);
    }, [categories.list])

    const [count, setCount] = useState(2);

    const handleDelete = (key) => {
        console.log(key);
        const category = categories.list[key];
        const slug = slugify(category.toLocaleLowerCase());
        removeCategory(slug, user.accessToken).catch((e) => toast.error("Error, please try again.") );

        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
        toast.success(`${category} has been deleted`);
    };

    const defaultColumns = [
        {
            title: 'Category',
            dataIndex: 'category',
            width: '90%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <a>Delete</a>
                    </Popconfirm>
                ) : null,
        },
    ];


    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        const category = categories.list[index];
        const slug = slugify(category.toLocaleLowerCase());
        updateCategory(slug, user.accessToken, row.category).catch(() => toast.error("Error, please try again."));
        newData.splice(index, 1, { ...item, ...row });
        setDataSource(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });
    return (
        <div>
            <ToastContainer />
            <Divider orientation="left"><h4>{`Categories List (${dataSource.length})`}</h4></Divider>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
            />
        </div>
    );
};

export default CategoriesTable;

