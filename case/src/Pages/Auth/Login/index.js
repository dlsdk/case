import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate} from 'react-router-dom';
import { Layout, Button, Col, Form, Input, Row, Switch, Typography, Modal } from 'antd';
import login from 'assets/images/loginbg.png';
import UserActions from 'Redux/Actions/UserActions';
import { useDispatch } from "react-redux";

const { getUpdateUserSuccess } = UserActions;
const { Content } = Layout;
const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/', values);

      if (response.status === 200) {
        const { access, refresh , user} = response.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log("ne oldu burda : ",response.data.user )
        dispatch(getUpdateUserSuccess(user));
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
      const errorMessage = error | 'An error occurred during login. Please try again later.';
      Modal.error({
        title: 'Error',
        content: errorMessage,
      });
    }
  };

  return (
    <div className="layout-default layout-signin">
      <Content className="signin">
        <Row gutter={[1, 0]} justify="space-evenly">
          <Col xs={24} md={12} lg={10} xl={8} className="mb-24">
            <Title className="mb-15">LOGIN</Title>
            <Title className="font-regular text-muted" level={5}>
              Enter your email and password to sign in
            </Title>
            <Form
              onFinish={handleSubmit}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                className="email"
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                className="password"
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                >
                  Login
                </Button>
              </Form.Item>
              <p className="font-semibold text-muted">
                Don't have an account?{' '}
                <NavLink to="/auth/register" className="text-dark font-bold">
                  Register
                </NavLink>
              </p>
            </Form>
          </Col>
          <Col xs={24} md={12} lg={10} xl={8} className="mb-24">
            <img src={login} alt="" style={{ width: '100%'}}  />
          </Col>
        </Row>
      </Content>
    </div>
  );
};

export default Login;
