import {Popconfirm} from "antd";
import {removeSubcategory} from "../../utils/subcategory/subcategory.utils";
import {toast} from "react-toastify";
const slugify = require("slugify");

export const getDeletableRowConfig = (dataSource, handleDelete) => {
    const rowConfig = {
        title: 'Operation',
        dataIndex: 'operation',
        render: (_, record) =>
            dataSource.length >= 1 ? (
                <Popconfirm
                    title="Sure to delete?"
                    onConfirm={() => handleDelete(record.key)}>
                    <a>Delete</a>
                </Popconfirm>
            ) : null,
    }
    return rowConfig;
}

/*
const handleDelete = (key) => {
          const subcategory = subcategories.list[key];
          const slug = slugify(subcategory.toLocaleLowerCase());
          removeSubcategory(slug, user.accessToken).catch((e) => toast.error("Error, please try again."));
          const newData = dataSource.filter((item) => item.key !== key);
          setDataSource(newData);
          toast.success(`${subcategory} has been deleted`);
      };
* */