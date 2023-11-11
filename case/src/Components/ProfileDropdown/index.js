import React from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {isCursorAtStart} from "@testing-library/user-event/dist/utils";
import axios from "axios";

const ProfileDropdown = () => {
    const navigate = useNavigate();


const logout = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    const accessToken = localStorage.getItem('access_token');

    console.log("refresh token : FE: ",refreshToken);
    console.log("acces token : FE : ", accessToken);
    if (!refreshToken || !accessToken) {
      // Token'lar eksikse, kullanıcıyı tekrar giriş yapmaya yönlendirebilirsiniz.
      console.error('Access token or refresh token not found.');
      return;
    }

    const response = await axios.post(
      'http://localhost:8000/api/logout/',
      { refresh_token: refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
    // Hata durumunda kullanıcıyı uyarmak veya başka bir işlem yapmak isteyebilirsiniz.
  }
};
    const handleMenuClick = (e) => {
        if (e.key === 'profile') {
            // Profil sayfasına yönlendirme işlemi
            navigate('/profile');
        } else if (e.key === 'logout') {
          logout();
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
