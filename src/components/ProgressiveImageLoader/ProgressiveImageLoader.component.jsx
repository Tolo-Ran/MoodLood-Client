import { Button, Image, Space } from 'antd';
import { useState } from 'react';

const ImageProgressivelyLoading = ({props}) => {

    return (
        <Space size={12}>
            <Image
                width={250}
                src="https://res.cloudinary.com/dsrvfpvbw/image/upload/v1656445141/qpav7kuvk9amq3gadpad.jpg"
                preview={false}
                placeholder={
                    <Image
                        preview={false}
                        src="https://res.cloudinary.com/dsrvfpvbw/image/upload/v1656445141/qpav7kuvk9amq3gadpad.jpg"

                        width={300}
                    />
                }
            />
        </Space>
    );
};

export default ImageProgressivelyLoading;