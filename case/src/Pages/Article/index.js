import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {Button, Input, Modal, Form, Row, Col, Card, Typography, Image} from 'antd';

const { Title, Paragraph, Text } = Typography;
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
        <Card style={{ width: '80%', height:'fit-content' , margin: 'auto', marginTop: '3%'}}>
            <Row>
                <Col xs={24} md={12} lg={14} xl={16} className="mb-24">
                    <div className="h-full col-content p-24">
                        <div className="ant-muse">
                            <Title level={4}>{data.title}</Title>
                            <h4>Author: {data.author}</h4>
                            <p style={{ marginBottom: '1%' }}>{data.publishedAt}</p>
                            <div className="content-wrapper" style={{ minHeight: "140px", maxHeight: "180px", overflowY: "auto" }}>
                                <Paragraph className="lastweek mb-36" style={{ width: '100%' }}>
                                    {data.description}
                                </Paragraph>
                            </div>
                            <Button type="primary" className="edit-button" onClick={handleEdit}>
                                Edit Article
                            </Button>
                            <Modal
                                title="Edit Article"
                                visible={isEditModalVisible}
                                onOk={handleSave}
                                onCancel={() => setIsEditModalVisible(false)}
                            >
                                <Form form={form} layout="vertical">
                                    <Form.Item name="author" label="Author">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="title" label="Title">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="description" label="Content">
                                        <Input.TextArea rows={10} size={200} />
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </div>
                    </div>
                </Col>
                <Col xs={24} md={12} lg={10} xl={8} className="mb-24">
                    <div className="image-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Image src={data.urlToImage} style={{ objectFit: 'cover', maxWidth: '100%', maxHeight: '100%' }} />
                    </div>
                </Col>
            </Row>
        </Card>


    );
}

export default Article;
