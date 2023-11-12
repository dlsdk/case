import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Col, Form, Image, Modal, Row } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import {formData, getLocalStorageItem, passwordChangeFormFields} from 'helpers';
import { useSelector, useDispatch } from 'react-redux';
import UserActions from 'Redux/Actions/UserActions';
import { selectUser } from 'Redux/Selectors';
import ProfileDetail from './component/ProfileDetail';
import ProfileForm from './component/ProfileForm';
import PasswordChange from './component/PasswordChange';
import image from 'assets/images/user.png';
import axios from "axios";

const { updateUser, getUser } = UserActions;

const avatarStyle = { display: 'inline-block', marginLeft: '20px' };
const bodyStyle = { paddingTop: 0, paddingBottom: 16 };
const imageStyle = { width: '150px' };

const getCardTitle = () => (
    <>
        <Avatar icon={<UserOutlined />} size={50} />
        <h6 style={avatarStyle}>Profile</h6>
    </>
);

const Profile = () => {
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
    const [passwordForm] = Form.useForm();
    const [profileForm] = Form.useForm();
    const storedUserData = useSelector(selectUser);
    const dispatch = useDispatch();
    const [data, setData] = useState(storedUserData);

    useEffect(() => {
        console.log("effecte", data);
       dispatch(getUser(getLocalStorageItem('currentUser').email))
    }, [data]);

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

                axios.put(`http://localhost:8000/api/change-password/`,{id: getLocalStorageItem('currentUser').id, new_password : newPassword} )
    .then(response => {
      // Handle the successful response
      console.log('Response:', response.data);
    })
    .catch(error => {
      // Handle errors
      console.error('Error:', error);
    });


               // setIsPasswordModalVisible(false);
            } else {
                throw new Error('The two passwords do not match. Please try again.');
            }
        } catch (error) {
            Modal.error({
                title: 'Error',
                content: error.message || 'An error occurred while changing the password.',
            });
            passwordForm.resetFields();
        }
    };

const handleSave = () => {
  console.log("Alican: ", profileForm.isFieldsValidating());
  profileForm
    .validateFields()
    .then((values) => {
      const currentUser = { ...getLocalStorageItem('currentUser') };
      Object.keys(currentUser).forEach((key) => {
        if (values.hasOwnProperty(key) && currentUser[key] !== values[key] && values[key]) {
          currentUser[key] = values[key];
        }
      });
      setData(currentUser);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      dispatch(updateUser(currentUser));
      profileForm.resetFields();
      setIsEditModalVisible(false);
    })
    .catch((err) => {
      Modal.error({
        title: 'Error',
        content: err.message || 'Validation Error!',
      });
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
                bodyStyle={bodyStyle}
            >
                <hr className="my-25" />
                <Row>
                    <Col xs={24} md={12} lg={14} xl={16} className="mb-24">
                        <ProfileDetail title="Profile Detail" data={storedUserData} />
                        <Button
                            type="primary"
                            onClick={() => setIsPasswordModalVisible(true)}
                            style={{ marginTop: '5%' }}
                        >
                            Change Password
                        </Button>
                        <Modal
                            title="Change Password"
                            visible={isPasswordModalVisible}
                            onOk={handleSubmitPassword}
                            onCancel={() => setIsPasswordModalVisible(false)}
                            style={{ marginLeft: '35%' }}
                        >
                            <PasswordChange formFields={passwordChangeFormFields} form={passwordForm} />
                        </Modal>
                    </Col>
                    <Col xs={24} md={12} lg={10} xl={8} className="mb-24" style={{ margin: 'auto' }}>
                        <Image preview={false} src={image} size={61} style={imageStyle} />
                    </Col>
                </Row>
            </Card>
            <Modal
                title="Edit Profile"
                visible={isEditModalVisible}
                onOk={handleSave}
                onCancel={() => setIsEditModalVisible(false)}
                style={{ marginLeft: '35%' }}
            >
                <ProfileForm form={profileForm} formData={formData} />
            </Modal>
        </div>
    );
};

export default Profile;
