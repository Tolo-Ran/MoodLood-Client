import {Form, InputNumber} from 'antd';

const CurrencyInput = ({props}) => {
    const {label, name, currency, isRequired} = props;

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
                formatter={(value) => `${currency} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
        </Form.Item>
    );
};
export default CurrencyInput;