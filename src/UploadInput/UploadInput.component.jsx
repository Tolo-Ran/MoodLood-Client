import {Upload, Form} from "antd";
import {InboxOutlined} from "@ant-design/icons";

const UploadInput = ({props}) => {
    const {
        name,
        listType,
        accept,
        multiple,
        draggerName,
        uploadText,
        uploadHint
    } = props;
    const normFile = (e) => {
        console.log("Upload event:", e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };
    return (
        <Form.Item
            valuePropName="fileList"
            getValueFromEvent={normFile}
            name={name}
            noStyle>
            <Upload.Dragger
                listType={listType}
                accept={accept}
                multiple={multiple}
                name={draggerName}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                </p>
                <p className="ant-upload-text">{uploadText}</p>
                <p className="ant-upload-hint">{uploadHint}</p>
            </Upload.Dragger>
        </Form.Item>
    );
};

export default UploadInput;