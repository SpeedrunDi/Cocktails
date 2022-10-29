import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {toast} from "react-toastify";

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const CLEAR_REGISTER_ERRORS = 'CLEAR_REGISTER_ERRORS';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const CLEAR_LOGIN_ERRORS = 'CLEAR_LOGIN_ERRORS';

export const LOGOUT_USER = 'LOGOUT_USER';

const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
const registerUserSuccess = (user) => ({type: REGISTER_USER_SUCCESS, payload: user});
const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, payload: error});
export const clearRegisterErrors = () => ({type: CLEAR_REGISTER_ERRORS});

const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, payload: user});
const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, payload: error});
export const clearLoginErrors = () => ({type: CLEAR_LOGIN_ERRORS});

export const registerUser = userData => {
  return async dispatch => {
    try {
      dispatch(registerUserRequest());

      const response =  await axiosApi.post('/users', userData);

      await dispatch(registerUserSuccess(response.data));
      dispatch(historyPush('/'));
    } catch (e) {
      if (e.response && e.response.data) {
        dispatch(registerUserFailure(e.response.data));
      } else {
        dispatch(registerUserFailure({global: 'No internet'}));
      }
    }
  };
};

export const facebookLogin = data => {
  return async dispatch => {
    try {
      const response = await axiosApi.post('/users/facebookLogin', data);
      dispatch(loginUserSuccess(response.data.user));
      console.log(response);
      dispatch(historyPush('/'));
    } catch (e) {
      dispatch(loginUserFailure(e.response.data));
    }
  };
};

export const loginUser = userData => {
  return async dispatch => {
    try {
      dispatch(loginUserRequest());

      const response = await axiosApi.post('/users/sessions', userData);

      await dispatch(loginUserSuccess(response.data.user));
      dispatch(historyPush('/'));
    } catch (e) {
      if (e.response && e.response.data) {
        dispatch(loginUserFailure(e.response.data));
      } else {
        dispatch(loginUserFailure({global: 'No internet'}));
      }
    }
  };
};

export const logoutUser = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().users.user.token;
      const headers = {'Authorization': token};

      await axiosApi.delete('/users/sessions', {headers});

      dispatch({type: LOGOUT_USER});
      dispatch(historyPush('/login'));
      toast.success('Logout successfully');
    } catch (e) {
      console.log(e);
    }
  };
};