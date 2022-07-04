import { Select, Form } from 'antd';
const { Option } = Select;

const SelectWithSearch = ({props}) => {
    const {data, name, placeholder, label, isRequired, onChange} = props;

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
            <Select
                showSearch
                style={{width: 200}}
                placeholder={placeholder}
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onChange={(value) => onChange(value)}
            >
                {data && data.map(optionValue => (
                    <Option key={optionValue}>{optionValue}</Option>
                ))}
            </Select>
        </Form.Item>
    );
};

export default SelectWithSearch;