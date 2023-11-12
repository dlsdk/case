import {USER_ERROR, GET_USER_PENDING, GET_UPDATE_USER_SUCCESS} from 'Redux/Actiontypes'
import axios from "axios";
import {getLocalStorageItem} from 'helpers';

const userError = (error) => {
    return {
        type: USER_ERROR,
        error
    }
}

const getUserPending= () => {
    return {
        type: GET_USER_PENDING,
    }
}

const getUpdateUserSuccess = (data) => {
    return {
        type: GET_UPDATE_USER_SUCCESS,
        data
    }
}


const updateUser = (userData) => dispatch => {
    axios.put('http://localhost:8000/api/profile/', userData)
      .then((response) => {
        dispatch(getUpdateUserSuccess(response.data));
      })
      .catch((error) => {
           dispatch(userError(error));
      });
};

const getUser = (email) => dispatch => {
    dispatch(getUserPending());
    console.log('Dispatching getArticlePending');
    axios.get(`http://localhost:8000/api/profile/?email=${email}`)
        .then(data => {
            dispatch(getUpdateUserSuccess(data));
        })
        .catch(error => {
            dispatch(userError(error));
        });
}

const UserActions = {getUser, updateUser, getUpdateUserSuccess};
export default UserActions;