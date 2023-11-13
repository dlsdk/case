import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Input, Modal, Form, Row, Col, Card, Typography, Image } from 'antd';
import ArticleActions from 'Redux/Actions/ArticleActions';
import { useDispatch } from 'react-redux';

const { Title, Paragraph } = Typography;
const { updateArticle } = ArticleActions;

function Article() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState(location.state?.data || {});

  const handleSave = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      Object.keys(data).forEach((key) => {
        if (values.hasOwnProperty(key) && data[key] !== values[key] && values[key]) {
          data[key] = values[key];
        }
      });
      setData(data);
      dispatch(updateArticle(data));
      setIsEditModalVisible(false);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  return (
    <Card style={{ width: '80%', height: 'fit-content', margin: 'auto', marginTop: '3%' }}>
      <Row>
        <Col xs={24} md={12} lg={14} xl={16} className="mb-24">
          <div className="h-full col-content p-24">
            <div className="ant-muse">
              <Title level={4}>{data.title}</Title>
              <h4>Author: {data.author}</h4>
              <p style={{ marginBottom: '5%' }}>{data.publishedAt}</p>
              <div className="content-wrapper" style={{ minHeight: '150px', maxHeight: '180px', overflowY: 'scroll' }}>
                <Paragraph className="lastweek mb-36" style={{ width: '100%' }}>
                  {data.description}
                </Paragraph>
              </div>
              <Button type="primary" className="edit-button" onClick={() => setIsEditModalVisible(true)}>
                Edit Article
              </Button>
              <Modal title="Edit Article" visible={isEditModalVisible} onOk={handleSave} onCancel={() => setIsEditModalVisible(false)}>
                <Form form={form} layout="vertical">
                  <Form.Item name="author" label="Author">
                    <Input />
                  </Form.Item>
                  <Form.Item name="title" label="Title">
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="description"
                    label="Content"
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: 'Please enter content!',
                      },
                      {
                        min: 250,
                        message: 'Content must be at least 250 characters!',
                      },
                    ]}
                  >
                    <Input.TextArea rows={10} />
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
