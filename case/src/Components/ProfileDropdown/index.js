import React from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const ProfileDropdown = () => {

    const navigate = useNavigate();
    const handleMenuClick = (e) => {
        if (e.key === 'profile') {
            navigate('/profile');
        } else if (e.key === 'logout') {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate('auth/login');
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="profile" icon={<UserOutlined />}>
                Profile
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} placement="bottomRight" arrow>
            <Avatar icon={<UserOutlined />} size={50} style={{cursor:'pointer'}}/>
        </Dropdown>
    );
};

export default ProfileDropdown;
