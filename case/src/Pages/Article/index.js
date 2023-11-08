import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Button, Input, Modal, Form, Row, Col } from 'antd';

function Article() {
    const location = useLocation();
    const data = location.state.data;
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const [form] = Form.useForm();

    const handleEdit = () => {
        form.setFieldsValue(data);
        setIsEditModalVisible(true);
    };

    const handleSave = () => {
        const values = form.getFieldsValue();
        console.log("values nedir : ", values);
        setIsEditModalVisible(false);
    };

    return (
        <div className="article-detail">
            <h1 className="article-title">{data.title}</h1>
            <p className="article-author">Author: {data.author}</p>
            <p className="article-content">{data.content}</p>

            <Button type="primary" onClick={handleEdit}>
                Edit Article
            </Button>

            <Modal
                title="Edit Article"
                visible={isEditModalVisible}
                onOk={handleSave}
                onCancel={() => setIsEditModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="author" label="author">
                        <Input />
                    </Form.Item>
                    <Form.Item name="title" label="Title">
                        <Input />
                    </Form.Item>
                    <Form.Item name="content" label="Content">
                        <Input.TextArea rows={20} size={200} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default Article;
