import {Col, Image, Row, Space} from 'antd';

const MultipleImagePreview = ({images}) => (
    <>
        <Image.PreviewGroup>
            <Row
                style={{marginBottom: 8}}
               >
                {images.map((image) => (
                    <Col key={image.url} style={
                        {marginBottom: 8, marginRight: 8}
                    }>
                        <Image width={200}
                               src= {image.url}
                        />
                    </Col>)
                )}
            </Row>
        </Image.PreviewGroup>

    </>
);

export default MultipleImagePreview;