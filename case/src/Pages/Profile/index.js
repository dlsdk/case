import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Image,
  Modal,
  Row
} from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import {
  formData,
  getLocalStorageItem,
  passwordChangeFormFields
} from 'helpers';
import { useSelector, useDispatch } from 'react-redux';
import UserActions from 'Redux/Actions/UserActions';
import { selectUser } from 'Redux/Selectors';
import ProfileDetail from './component/ProfileDetail';
import ProfileForm from './component/ProfileForm';
import PasswordChange from './component/PasswordChange';
import image from 'assets/images/user.png';

const currentUserKey = 'currentUser';
const errorTitle = 'Error';

const { updateUser, getUser, changePassword } = UserActions;

const getCardTitle = () => (
  <>
    <Avatar icon={<UserOutlined />} size={50} />
    <h6 style={{ display: 'inline-block', marginLeft: '20px' }}>Profile</h6>
  </>
);

const Profile = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [passwordForm] = Form.useForm();
  const [profileForm] = Form.useForm();
  const currentUser = useSelector(selectUser);
  const dispatch = useDispatch();
  const [data, setData] = useState(currentUser);

  useEffect(() => {
    if (!currentUser) {
      dispatch(getUser(getLocalStorageItem(currentUserKey)?.email));
    } else {
      setData(currentUser);
    }
  }, [currentUser]);

  const handleSubmitPassword = async () => {
    try {
      await passwordForm.validateFields();
      const newPassword = passwordForm.getFieldValue('newPassword');

      if (newPassword) {
        await changePassword({
          email: getLocalStorageItem(currentUserKey)?.email,
          new_password: newPassword
        });
        passwordForm.resetFields();
        setIsPasswordModalVisible(false);
      } else {
        throw new Error('New password cannot be empty.');
      }
    } catch (error) {
      const errorMessage = error.errorFields
        ? error.errorFields.map((field) => field.errors.join(', ')).join(' ')
        : error.error || 'An error occurred while changing the password.';
      Modal.error({
        title: errorTitle,
        content: errorMessage
      });
      passwordForm.resetFields();
    }
  };

  const handleSave = () => {
    profileForm
      .validateFields()
      .then((values) => {
        const updatedUser = { ...data };
        Object.keys(updatedUser).forEach((key) => {
          if (
            values.hasOwnProperty(key) &&
            updatedUser[key] !== values[key] &&
            values[key]
          ) {
            updatedUser[key] = values[key];
          }
        });

        localStorage.setItem(currentUserKey, JSON.stringify(updatedUser));
        dispatch(updateUser(updatedUser));
        setData(updatedUser);
        profileForm.resetFields();
        setIsEditModalVisible(false);
      })
      .catch((error) => {
        const errorMessage = error.errorFields
          ? error.errorFields.map((field) => field.errors.join(', ')).join(' ')
          : error.error || 'Validation Error!';
        Modal.error({
          title: errorTitle,
          content: errorMessage
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
        bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
      >
        <hr className="my-25" />
        <Row>
          <Col xs={24} md={12} lg={14} xl={16} className="mb-24">
            <ProfileDetail title="Profile Detail" data={data || {}} />
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
