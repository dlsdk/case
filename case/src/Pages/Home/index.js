import React, { useState } from 'react';
import {NavLink, Outlet} from "react-router-dom";
import {Button, Layout, Menu, theme} from "antd";
import Sider from "antd/es/layout/Sider";
import {
    DashboardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined, UserOutlined,
} from "@ant-design/icons";
import {Content, Header} from "antd/es/layout/layout";
import ProfileDropdown from "../../Components/ProfileDropdown";

const items = [
    {
        label: 'Dashboard',
        key: 'dashboard',
        icon: <DashboardOutlined />,
        to: '/',
    },
    {
        label: 'Profile',
        key: 'profile',
        icon: <UserOutlined />,
        to: '/profile',
    },
];

function HomeLayout() {

    const {
        token: { colorBgLayout },
    } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="vertical"
                >
                    {items.map((item) => (
                        <Menu.Item key={item.key} icon={item.icon}>
                            <NavLink to={item.to}>{item.label}</NavLink>
                        </Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgLayout }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 54,
                            height: 54,
                        }}
                    />
                    <div style={{ float: 'right' , marginRight:'40px'}}>
                        <ProfileDropdown />
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 20,
                        paddingTop: 0,
                        minHeight: 280,
                        background: colorBgLayout,
                    }}
                >
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>);
}

export default HomeLayout;