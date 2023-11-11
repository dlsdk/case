import React from 'react';
import { Form, Input } from 'antd';

const PasswordChange = ({ formFields, form}) => {
    return (
            <Form form={form}>
                {formFields.map((field) => (
                    <Form.Item
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        rules={field.rules}
                    >
                        <Input type={field.type || 'text'} />
                    </Form.Item>
                ))}
            </Form>
    );
};

export default PasswordChange;
