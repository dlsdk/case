import React, { useState } from 'react';
import axios from 'axios';
import {Link, Navigate, NavLink, useNavigate} from 'react-router-dom';
import { Layout, Button, Col, Form, Input, Row, Switch, Typography, Modal } from 'antd';
import login from 'assets/images/loginbg.png';

const { Content } = Layout;
const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/', values);

      if (response.status === 200) {
        const { access, refresh } = response.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Modal.error({
        title: 'Error',
        content: 'An error occurred during login. Please try again later.',
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
                className="username"
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
                className="username"
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
