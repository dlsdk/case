import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import {
    HomeOutlined,
    AppstoreOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const items = [
    {
        label: 'Home',
        key: 'home',
        icon: <HomeOutlined />,
        to: '/',
    },
    {
        label: 'Navigation Two',
        key: 'app',
        icon: <AppstoreOutlined />,
        to: '/deneme',
    },
];

const Navbar = () => {
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (<>

        <Header></Header>
        <Menu onClick={onClick} theme="dark" defaultSelectedKeys="home" mode="horizontal">
            {items.map((item) => (
                <Menu.Item key={item.key} icon={item.icon}>
                    <NavLink to={item.to}>{item.label}</NavLink>
                </Menu.Item>
            ))}
        </Menu> </>
    );

};

export default Navbar;
