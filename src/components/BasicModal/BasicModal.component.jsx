import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
const { confirm } = Modal;

export const showConfirm = () => {
    confirm({
        title: 'Do you Want to delete these items?',
        icon: <ExclamationCircleOutlined />,
        content: 'Some descriptions',

        onOk() {
            console.log('OK');
        },

        onCancel() {
            console.log('Cancel');
        },
    });
};

export const showPromiseConfirm = () => {
    confirm({
        title: 'Do you want to delete these items?',
        icon: <ExclamationCircleOutlined />,
        content: 'When clicked the OK button, this dialog will be closed after 1 second',

        onOk() {
            return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log('Oops errors!'));
        },

        onCancel() {},
    });
};

export const showDeleteConfirm = (title, content, handleDelete) => {
    confirm({
        title: title,
        icon: <ExclamationCircleOutlined />,
        content: content,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',

        onOk() {
            handleDelete();
        },

        onCancel() {
            console.log('Cancel');
        },
    });
};

export const showPropsConfirm = () => {
    confirm({
        title: 'Are you sure delete this task?',
        icon: <ExclamationCircleOutlined />,
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        okButtonProps: {
            disabled: true,
        },
        cancelText: 'No',

        onOk() {
            console.log('OK');
        },

        onCancel() {
            console.log('Cancel');
        },
    });
};
