import {Tag} from "antd";

const brands = ["Apple", "Lenovo", "Google"];
const tagRenderColors = (props) => {
    const {label, value, closable, onClose} = props;

    const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <Tag
            color={value}
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

export const subcategorySelectInputProps = (subcategoryNames) => {
    return {
        label: "Subcategory",
        name: "subcategory",
        placeholder: "Select a subcategory",
        defaultValue: [],
        isRequired: true,
        data: subcategoryNames,
    };
}

export const categorySelectInputProps = (categoriesNames, handleCategoryChange) => {
    return {
        data: categoriesNames,
        onChange: handleCategoryChange,
        label: "Category",
        name: "category",
        isRequired: true,
        passive: true,
        placeholder: "Select a category",
    };
}
export const titleInputProps = {
    name: "title",
    label: "Title",
    isRequired: true
}
const handleChange = (value) => {
    //Pass change if needed
}
export const colorSelectInputProps = {
    label: "Colors",
    name: "colors",
    onChange: handleChange,
    isRequired: true,
    placeholder: "Select colors",
    tagRender: {tagRenderColors},
    defaultValue: [],
    data: ["red", "green", "blue"],
}
export const shippingSelectInputProps = {
    name: "shipping",
    label: "Shipping",
    isRequired: true,
    options: ["Yes", "No"],
}
export const brandSelectInputProps = {
    name: "brand",
    label: "Brand",
    onChange: handleChange,
    allowClear: true,
    isRequired: true,
    placeholder: "Select a brand",
    data: ["Apple", "Google", "Lenovo"]
};
export const quantityInputProps = {
    label: "Quantity",
    name: "quantity",
    isRequired: true
}
export const priceInputProps = {
    label: "Price",
    name: "price",
    currency: '€',
    isRequired: true
}
export const imagesUploadInputProps = {
       name: "images",
       listType: "picture",
       accept: ".png, .jpeg",
       multiple: true,
       draggerName: "imageDragger",
       uploadText: "Upload product images",
       uploadHint: "Support multiple files upload. File types images .png and . jpeg",
   }
