import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import UserActions from 'Redux/Actions/UserActions';

const { changePassword } = UserActions;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const [email, setEmail] = useState();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setEmail(queryParams.get('email'));
  }, []);

  const onFinish = (values) => {
    changePassword({
      email,
      new_password: values.newPassword,
    });

    navigate('/auth/login');
    form.resetFields();
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '15%' }}>
      <h1>Reset Password</h1>
      <Form form={form} name="reset-password-form" onFinish={onFinish}>
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            {
              required: true,
              message: 'Please enter your new password',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your new password',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
