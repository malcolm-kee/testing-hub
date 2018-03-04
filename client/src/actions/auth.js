import { SET_LOGIN_STATUS, SET_USER_NAME } from '../constants/actions';

export const setLoginStatus = ({ loggedIn, userName, isAdmin }) => ({
  type: SET_LOGIN_STATUS,
  payload: { loggedIn, userName, isAdmin }
});

export const setUserName = userName => ({ type: SET_USER_NAME, payload: userName });
