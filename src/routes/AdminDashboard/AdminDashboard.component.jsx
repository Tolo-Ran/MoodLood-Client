import {Breadcrumb} from "antd";

export const AdminDashboard = () => {
    return (
        <>
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item>Admin</Breadcrumb.Item>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
          <h1>Hello admin</h1>
        </>
    );
}
;