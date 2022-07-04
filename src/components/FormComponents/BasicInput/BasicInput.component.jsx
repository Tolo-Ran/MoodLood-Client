import {Form, Input} from "antd";

const BasicInput = ({props}) => {
    const {name, label, isRequired, ...restProps} = props;
    return (
        <Form.Item
            name={name}
            label={label}
            rules={[
                {
                    required: isRequired,
                    message: `${label} required`
                },
            ]}
            {...restProps}
        >
            <Input/>
        </Form.Item>
    );
};
export default BasicInput;