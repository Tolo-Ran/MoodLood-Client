import { Descriptions } from 'antd';

const BasicDescription = ({props}) => {
    const {
        size,
        column,
        data,
    ...restProps} = props;

    return (
        <div>
            <Descriptions
                {...restProps}
                size={size}
                column={column}
            >
                {data.map(item => (<Descriptions.Item key={`descriptions${item._id}`} label={item.label}>{item.value}</Descriptions.Item>))}
            </Descriptions>
        </div>
    )

};

export default BasicDescription;

/*Data Structure
* data = [{
* label: ,
* value: ,
* }]*/