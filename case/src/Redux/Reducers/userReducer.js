import {USER_ERROR, USER_PENDING, USER_SUCCESS} from 'Redux/Actiontypes'

const initialState = {
    user: {},
    error : '',
    isLoading:false,
}

const userReducer = (state= initialState,action) => {

    switch(action.type)
    {
        case USER_PENDING:
            return {
                ...state,
                isLoading:true,
            }
        case USER_SUCCESS:
            return {
                ...state,
                user: action.data,
                isLoading:false,
            };
        case USER_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading:false,
            };
        default:
            return state;
    }
}

export default userReducer;