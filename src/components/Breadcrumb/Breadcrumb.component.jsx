import {Breadcrumb} from "antd";

const BasicBreadcrumb = ({path}) => {
    return (
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                {path.map(crumb => (<Breadcrumb.Item key={crumb}>{crumb}</Breadcrumb.Item>))}
            </Breadcrumb>
    );
};
export default BasicBreadcrumb;