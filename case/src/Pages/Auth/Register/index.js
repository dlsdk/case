import React from 'react';
import { Form, Input, Button, Row, Col, Typography, Modal } from 'antd';
import { registerUser } from '../../../Redux/services/getData';
import { Link, NavLink } from 'react-router-dom';
import register from "../../../assets/images/bg.png";

const { Title } = Typography;

const Register = () => {
  const onFinish = async (values) => {
    const { confirmPassword, ...formData } = values;

    if (values.password !== confirmPassword) {
      Modal.error({
        title: 'Password Mismatch',
        content: 'The entered passwords do not match. Please check and try again.',
      });
      return;
    }

    const response = await registerUser(formData);

    if (response && response.status === 200) {
      Modal.success({
        title: 'Register Success',
        content: 'You have successfully registered!',
      });
    } else {
      Modal.error({
        title: 'Registration Failed',
        content: 'An error occurred during registration. Please try again later.',
      });
    }
  };

  return (
    <Row gutter={[8, 0]} justify="space-evenly" style={{ alignItems: 'center' , marginTop:'2%'}}>
         <Col xs={24} md={12} lg={10} xl={8} className="mb-24" style={{marginLeft: '5%'}}>
            <img src={register} alt="" style={{ width: '100%'}}  />
          </Col>
      <Col xs={24} md={12} lg={10} xl={8} className="mb-24"style={{marginRight: '8%'}}>
        <Title className="mb-15">REGISTER</Title>
        <Form onFinish={onFinish} layout="vertical" className="row-col">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>

          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: 'Please input your full name!',
              },
            ]}
          >
            <Input type="text" placeholder="Full Name" />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input type="text" placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={[
              {
                required: true,
                message: 'Please input your location!',
              },
            ]}
          >
            <Input type="text" placeholder="Location" />
          </Form.Item>
          <Form.Item
            label="Mobile"
            name="mobile"
            rules={[
              {
                required: true,
                message: 'Please input your mobile!',
              },
              { pattern: /^\d{10}$/,
                message: 'Please enter a valid 10-digit mobile number'
              }
            ]}
          >
            <Input type="text" placeholder="Location" />
          </Form.Item>

          <Form.Item
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

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Register
            </Button>
          </Form.Item>

          <p className="font-semibold text-muted">
            Already have an account?{' '}
            <NavLink to="/auth/login" className="text-dark font-bold">
              Login
            </NavLink>
          </p>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
