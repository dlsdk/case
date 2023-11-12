import React, { useState } from 'react';
import { Avatar, Button, Card, Col, Form, Image, Modal, Row } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import image from 'assets/images/user.png';
import ProfileDetail from './component/ProfileDetail';
import ProfileForm from './component/ProfileForm';
import PasswordChange from "./component/PasswordChange";
import { formData, passwordChangeFormFields } from 'helpers';
const Profile = () => {
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
    const  [passwordForm]= Form.useForm();
    const  [profileForm]= Form.useForm();
    const [data, setData] = useState(() => {
        const storedUserData = localStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : {};
    });
    const getCardTitle = () => (
        <>
            <Avatar icon={<UserOutlined />} size={50} />
            <h6 style={{ display: 'inline-block', marginLeft: '20px' }}>
                Profile
            </h6>
        </>
    );

    const handleSubmitPassword = async () => {
        try {
            await passwordForm.validateFields();

            const newPassword = passwordForm.getFieldValue('newPassword');
            const confirmPassword = passwordForm.getFieldValue('confirmPassword');

            if (newPassword === confirmPassword && newPassword && confirmPassword) {
                Modal.success({
                    title: 'Password Match',
                    content: 'Your password changed',
                });
                passwordForm.resetFields();
                setIsPasswordModalVisible(false);
            } else {
                throw new Error('The two passwords do not match. Please try again.');
            }
        } catch (error) {
            Modal.error({
                title: 'Error',
                content: error.message || 'An error occurred while changing the password.',
            });
            passwordForm.resetFields();
            setIsPasswordModalVisible(false);
        }
    };

    const handleSave = () => {
      /*  profileForm.validateFields().then(values => {
            setData(prevData => ({
                ...prevData,
                ...values,
            }));
            localStorage.setItem('currentUser', JSON.stringify({
                ...values,
            }));
            setIsEditModalVisible(false);
        }).catch(errorInfo => {
            console.error('Validation failed:', errorInfo);
        });*/


        profileForm.validateFields().then((values) => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

        Object.keys(values).map(key => {
            if (values[key] !== currentUser[key]) {
                currentUser[key] = values[key];
            }
        });
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    });
    };

    return (
        <div className="profile-layout">
            <Card
                bordered={false}
                title={getCardTitle()}
                className="profile-card"
                extra={
                    <Button type="link" onClick={() => setIsEditModalVisible(true)}>
                        <EditOutlined />
                    </Button>
                }
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}>
                <hr className="my-25" />
                <Row>
                    <Col xs={24} md={12} lg={14} xl={16} className="mb-24">
                        <ProfileDetail title="Profile Detail" data={data} />
                        <Button type="primary" onClick={() => setIsPasswordModalVisible(true)} style={{ marginTop: '5%' }}>
                            Change Password
                        </Button>
                        <Modal
                            title="Change Password"
                            visible={isPasswordModalVisible}
                            onOk={handleSubmitPassword}
                            onCancel={() => setIsPasswordModalVisible(false)}
                            style={{ marginLeft: '35%' }}
                        >
                            <PasswordChange
                                formFields={passwordChangeFormFields}
                                form={passwordForm}
                            />
                        </Modal>
                    </Col>
                    <Col xs={24} md={12} lg={10} xl={8} className="mb-24" style={{ margin: 'auto' }}>
                        <Image preview={false} src={image} size={61} style={{ width: '150px' }} />
                    </Col>
                </Row>
            </Card>
            <Modal
                title='Edit Profile'
                visible={isEditModalVisible}
                onOk={handleSave}
                onCancel={() => setIsEditModalVisible(false)}
                style={{ marginLeft: '35%' }}
            >
                <ProfileForm form={profileForm} formData={formData} />
            </Modal>
        </div>
    );
}

export default Profile;
