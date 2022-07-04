import {Form, Select, Tag} from "antd";
import {useEffect, useState} from "react";

const SelectMultiple = ({props}) => {
    const {label, name, defaultValue, data, isRequired, ...restProps} = props;
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (data) {
            const dataAsObj = [];
            data.map((option) => (
                dataAsObj.push(
                    {
                        value: option
                    }
                )
            ));
            setOptions([...dataAsObj]);
        }
    }, [data]);

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
                   mode="multiple"
                   showArrow
                   tagRender={tagRender}
                   style={{
                       width: '100%',
                   }}
                   options={options}
                   {...restProps}
               />

           </Form.Item>
    );
};

const tagRender = (propsTag) => {
    const { label, closable, onClose} = propsTag;

    const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <Tag
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{
                marginRight: 3,
            }}
        >
            {label}
        </Tag>
    );
};

export default SelectMultiple;