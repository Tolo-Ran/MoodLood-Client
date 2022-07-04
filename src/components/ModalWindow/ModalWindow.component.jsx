import {Modal} from 'antd';

const BasicModalWindow = ({title, visible, setVisible, children, ...restProps}) => {

    return (
        <>
            <Modal
                title={title}
                centered
                visible={visible}
                width={1000}

                onOk={() => {
                    setVisible(false)
                }}
                onCancel={() => {
                    setVisible(false)
                }}
                {...restProps}
            >
                {children}
            </Modal>
        </>
    );
};


export default BasicModalWindow;