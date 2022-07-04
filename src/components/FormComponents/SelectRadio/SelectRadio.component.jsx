import {Form, Radio} from "antd";

const SelectRadio = ({props}) => {
    const {name, label, options, isRequired} = props;
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
        >
            <Radio.Group>
                {options && options.map(val => (<Radio.Button key={val} value={val}>{val}</Radio.Button>))
                }
            </Radio.Group>
        </Form.Item>
    );
};

export default SelectRadio;