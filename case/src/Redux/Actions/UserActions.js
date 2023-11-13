import {USER_ERROR, USER_PENDING, USER_SUCCESS} from 'Redux/Actiontypes'
import axios from "axios";
import {putData} from 'Redux/services/getData';
import {notification} from "antd";

const userError = (error) => {
    return {
        type: USER_ERROR,
        error
    }
}

const getUserPending= () => {
    return {
        type: USER_PENDING,
    }
}

const userSuccess = (data) => {
    return {
        type: USER_SUCCESS,
        data
    }
}

const changePassword = (password) => {
    putData('http://localhost:8000/api/change-password/', password).then((response) => {
        notification.success({
        message: 'Password Changed Successful',
        description: 'Your password has been successfully changed.',
      });
      })
      .catch((error) => {
          notification.error({
        message: 'Password Changed Failed',
        description: 'An error occurred while changing the password.',
      });
      });
}


const updateUser = (userData) => dispatch => {
    putData('http://localhost:8000/api/profile/', userData).then((response) => {
        console.log("RESPONSE : ", response.data)
      })
      .catch((error) => {
          console.log("ERROR : ", error)
      });
};

const getUser = (email) => dispatch => {
    dispatch(getUserPending());
    axios.get(`http://localhost:8000/api/profile/?email=${email}`)
        .then(data => {
            dispatch(userSuccess(data));
        })
        .catch(error => {
            dispatch(userError(error));
        });
}

const UserActions = {getUser, updateUser, userSuccess, changePassword};
export default UserActions;