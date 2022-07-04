import {Table} from 'antd';
const BasicTable = ({props}) => {
    const {dataSource, columns, ...restProps} = props;

    return (
        <>
            <Table
                dataSource={dataSource}
                columns={columns}
                {...restProps}
            />
        </>
    );
};

export default BasicTable;

/* DATA STRUCTURE
* const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        }
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        }
    ];*/