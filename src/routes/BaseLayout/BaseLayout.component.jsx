
import { Layout } from 'antd';
import React from 'react';
import Navigation from "../../components/Navigation/Navigation.component";
import {Outlet} from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar.component";

  const { Header, Content, Sider } = Layout;

  const BaseLayout = () => {

    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
            <Navigation />
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
           <Sidebar />
          </Sider>
          <Layout
              style={{
                padding: '0 24px 24px',
              }}
          >
            <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
            >
              <Outlet/>
            </Content>
          </Layout>
        </Layout>
      </Layout>
  );

};

export default BaseLayout;