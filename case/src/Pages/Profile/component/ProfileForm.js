import React from 'react';
import {Form, Input} from "antd";

function ProfileForm({form, formData}) {
    return (
        <Form form={form} layout="vertical" className="profile-form">
            {formData.map(item => (
                <Form.Item key={item.key} name={item.key} label={item.label}>
                    <Input />
                </Form.Item>
            ))}
        </Form>
    );
}

export default ProfileForm;