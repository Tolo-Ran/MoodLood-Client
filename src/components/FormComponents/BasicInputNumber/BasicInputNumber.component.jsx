import {Form, InputNumber} from 'antd';

const BasicInputNumber = ({props}) => {
    const {label, name, defaultValue, isRequired} = props;

    return (
        <Form.Item
            label={label}
            name={name}
            rules={[
                {
                    required: isRequired,
                    message: `${label} required`
                },
            ]}
        >
            <InputNumber
                defaultValue={defaultValue}
            />
        </Form.Item>
    );
};
export default BasicInputNumber;